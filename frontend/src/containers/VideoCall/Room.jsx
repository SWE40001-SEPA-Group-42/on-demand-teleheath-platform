import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = useParams()
    const otherUser = useRef();

    useEffect(() => {
        socketRef.current = io.connect("localhost:8000");
        console.log(socketRef)
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);

                    otherUser.current = userID;

                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push({
                        peerID: userID,
                        peer
                    });
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);

                otherUser.current = payload.userID;

                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                const peerObj = {
                    peer,
                    peerID: payload.callerID
                }

                setPeers(users => [...users, peerObj]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            socketRef.current.on('user left', id => {
                const peerObj = peersRef.current.find(p => p.peerID === id)
                if (peerObj) {
                    peerObj.peer.destroy()
                }

                const peers = peersRef.current.filter(p => p.peerID !== id)
                peersRef.current = peers
                setPeers(peers)
            })

            socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
        })
    }, []);

    function createPeer(userToSignal, callerID, stream) {

        /*
            // Uses Google's Free Stun Servers, but has no TURN servers
            const peer = new Peer({
                iceServers: [
                    { urls: "stun:stun.l.google.com:19302" },
                    { urls: "stun:stun1.l.google.com:19302" },
                    { urls: "stun:stun2.l.google.com:19302" },
                    { urls: "stun:stun3.l.google.com:19302" },
                    { urls: "stun:stun4.l.google.com:19302" },
                ],
                initiator: true,
                trickle: false,
                stream,
            });
        */


        // https://www.metered.ca/tools/openrelay/ --> Free STUN and TURN servers
        const peer = new Peer({
            config: {
                iceServers: [
                    {
                      urls: "stun:openrelay.metered.ca:80",
                    },
                    {
                      urls: "turn:openrelay.metered.ca:80",
                      username: "openrelayproject",
                      credential: "openrelayproject",
                    },
                    {
                      urls: "turn:openrelay.metered.ca:443",
                      username: "openrelayproject",
                      credential: "openrelayproject",
                    },
                    {
                      urls: "turn:openrelay.metered.ca:443?transport=tcp",
                      username: "openrelayproject",
                      credential: "openrelayproject",
                    },
                ],
                initiator: true,
                trickle: false,
                stream,
            }
        })

        peer.onicecandidate = handleICECandidateEvent;
        // peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userToSignal);

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    function c(incoming) {
        const candidate = new RTCIceCandidate(incoming);

        peersRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }

    function handleNegotiationNeededEvent(userID) {
        peersRef.current.createOffer().then(offer => {
            return peersRef.current.setLocalDescription(offer);
        }).then(() => {
            const payload = {
                target: userID,
                caller: socketRef.current.id,
                sdp: peersRef.current.localDescription
            };
            socketRef.current.emit("offer", payload);
        }).catch(e => console.log(e));
    }

    function handleICECandidateEvent(e) {
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
            }
            socketRef.current.emit("ice-candidate", payload);
        }
    }

    // function handleTrackEvent(e) {
    //     partnerVideo.current.srcObject = e.streams[0];
    // };

    const leaveCall = () => {
        window.open("about:blank", "_self");
        window.close();
    }

    return (
        <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer) => {
                return (
                    <Video key={peer.peerID} peer={peer.peer} />
                );
            })}

            <Button onClick={leaveCall}>Leave Call</Button>
        </Container>
    );
};

export default Room;