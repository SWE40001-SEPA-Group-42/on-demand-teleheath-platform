import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import {
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsChatDotsFill,
  BsFillArrowRightSquareFill,
  BsFillMicFill,
  BsMicMuteFill,
  BsPersonPlusFill,
} from "react-icons/bs";
import { MdCallEnd } from "react-icons/md";
import VideoCallControls from "./VideoCallControls";

// const Container = styled.div`
//   padding: 20px;
//   display: flex;
//   height: 100vh;
//   width: 90%;
//   margin: auto;
//   flex-wrap: wrap;
// `;

const StyledVideo = styled.video`
  height: 100%;
  width: 100%;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const ConsultationRoom = (props) => {
  const [peers, setPeers] = useState([]);
  // const [peersNum, setPeersNum] = useState(peers.length);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const callerVideo = useRef();
  const otherUser = useRef();
  const roomID = useParams();
  const [localStream, setLocalStream] = useState(null);
  const [videoCallState, setVideoCallState] = useState({
    localVideo: null,
    isCameraOn: true,
    isMuted: false,
    isCallEnded: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    socketRef.current = io.connect("localhost:8000");
    console.log(socketRef);
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        setLocalStream(stream);
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            otherUser.current = userID;

            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push({
              peerID: userID,
              peer,
            });
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          otherUser.current = payload.userID;

          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          const peerObj = {
            peer,
            peerID: payload.callerID,
          };

          setPeers((users) => [...users, peerObj]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("user left", (id) => {
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }

          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
        });

        socketRef.current.on("ICEcandidate", handleNewICECandidateMsg);
      });
  }, []);

  const createPeer = (userToSignal, callerID, stream) => {
    
    /* Uncomment for LOCALHOST use
    const peer = new Peer({
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
      },
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userToSignal);

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  };

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peersRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleNegotiationNeededEvent(userID) {
    peersRef.current
      .createOffer()
      .then((offer) => {
        return peersRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peersRef.current.localDescription,
        };
        socketRef.current.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socketRef.current.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peersRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    callerVideo.current.srcObject = e.streams[0];
  }

  const addPeer = (incomingSignal, callerID, stream) => {
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
        initiator: false,
        trickle: false,
        stream,
      },
    });

    /* Uncomment for LOCALHOST use
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    */

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  // const LocalVideo = () => {
  //   setVideoCallState({
  //     ...videoCallState,
  //     localVideo: (
  //       <StyledVideo
  //         className="video-call-feed"
  //         muted
  //         ref={userVideo}
  //         autoPlay
  //         playsInline
  //       />
  //     ),
  //   });

  //   return videoCallState.isCameraOn && videoCallState.localVideo;
  // };

  async function toggleVideo(userStream) {
    // const localVideo = userStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
    const userVideo = userStream.getVideoTracks()[0];

    if (userVideo.enabled) {
      setVideoCallState({
        ...videoCallState,
        isCameraOn: !videoCallState.isCameraOn,
      });
      userVideo.enabled = false;
      // userVideo.stop();   TODO: Find a way to reproduce video
    } else {
      setVideoCallState({
        ...videoCallState,
        isCameraOn: videoCallState.isCameraOn,
      });
      userVideo.enabled = true;

      /* TODO: Find a way to reproduce video
      await navigator.mediaDevices.getUserMedia({
        video: true
      }).then((stream) => {
        userStream = stream
        setLocalStream(userStream)
      })
      */

      // console.log("Video is enabled: " + videoCallState.isCameraOn);
    }
  }

  const toggleMic = (userStream) => {
    // stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
    const userAudio = userStream.getAudioTracks()[0];
    if (userAudio.enabled) {
      setVideoCallState({
        ...videoCallState,
        isMuted: !videoCallState.isMuted,
      });
      userAudio.enabled = false;
      console.log(videoCallState.isMuted);
    } else {
      setVideoCallState({
        ...videoCallState,
        isMuted: !videoCallState.isMuted,
      });
      userAudio.enabled = true;
      console.log(videoCallState.isMuted);
    }

    // console.log("Mic is enabled: " + videoCallState.isMuted);
  };

  const leaveCall = () => {
    setVideoCallState({
      ...videoCallState,
      isCallEnded: !videoCallState.isCallEnded,
    });
    socketRef.current.destroy();
    console.log(socketRef);
    navigate("/leave-call");
  };

  return (
    <Box className="video-call-container">
      {/* temporary video header - for testing only */}
      <Text size="md" className="video-call-title">
        You are in a consultation with Emily Cooper
      </Text>
      <Box className="main-container">
        <Box className="main-left">
          <Box className="videos-group">
            <Box className="video-grid">
              <StyledVideo
                className={`current-user-video
                ${
                  videoCallState.isCameraOn ? "video-cam-on" : "video-cam-off"
                }`}
                muted
                ref={userVideo}
                autoPlay
                playsInline
              />
              {peers.map((peer) => {
                return (
                  <Video
                    className={`caller-video
                      ${
                        videoCallState.isCameraOn
                          ? "video-cam-on"
                          : "video-cam-off"
                      }`}
                    key={peer.peerID}
                    peer={peer.peer}
                    ref={callerVideo}
                  />
                );
              })}
              {console.log("Number of peers: " + peers.length)}
            </Box>
          </Box>
          <Box className="video-call-options">
            <Box className="video-call-options-left">
              <Box id="video-button" className="options-button">
                <IconButton
                  isRound
                  onClick={() => toggleVideo(localStream)}
                  colorScheme={videoCallState.isCameraOn ? "green" : "red"}
                  aria-label="Turn video off"
                  size="lg"
                  icon={
                    videoCallState.isCameraOn ? (
                      <BsCameraVideoFill />
                    ) : (
                      <BsCameraVideoOffFill />
                    )
                  }
                />
              </Box>
              <Box id="mic-button" className="options-button">
                <IconButton
                  isRound
                  onClick={() => toggleMic(localStream)}
                  colorScheme={videoCallState.isMuted ? "red" : "green"}
                  aria-label="Turn microphone on"
                  size="lg"
                  icon={
                    videoCallState.isMuted ? (
                      <BsMicMuteFill />
                    ) : (
                      <BsFillMicFill />
                    )
                  }
                />
              </Box>
              <Box id="end-call-button" className="options-button">
                <IconButton
                  isRound
                  onClick={() => leaveCall()}
                  colorScheme="red"
                  aria-label="Leave call"
                  size="lg"
                  icon={<MdCallEnd />}
                />
              </Box>
            </Box>
            {/* TODO: Add in Chat Functionality
              <Box className="video-call-options-right">
                <Box id="chat-button" className="options-button">
                  <IconButton
                    isRound
                    colorScheme="blue"
                    aria-label="Turn chat on"
                    size="lg"
                    icon={<BsChatDotsFill />}
                  />
                </Box>
                <Box id="invite-button" className="options-button">
                  <IconButton
                    colorScheme="blue"
                    aria-label="Invite participant"
                    size="lg"
                    icon={<BsPersonPlusFill />}
                  />
                </Box>
              </Box> 
            */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ConsultationRoom;
