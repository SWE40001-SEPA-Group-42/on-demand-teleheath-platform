import { useState, useEffect, useRef } from 'react'
import Peer from "simple-peer"
import io from "socket.io-client"

//testing only
import './video.css'
import { CopyToClipboard } from "react-copy-to-clipboard"


const socket = io.connect('http://localhost:8001')

const VideoCall = () => {

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream
        })

        socket.on('Current User', (id) => {
            setMe(id)
            console.log(id)
        })

        socket.on("calluser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })
    }, [])

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })

        peer.on("signal", (data) => {
            socket.emit("calluser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        socket.on("callaccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })

        peer.on("signal", (data) => {
            socket.emit("answercall", {
                signal: data,
                to: caller
            })
        })

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
    }


    return (
        <div>
            <h1 style={{ textAlign: "center", color: "#fff" }}>Video Call</h1>
            <div className="container">
                <div className="video-container">
                    <div className="video">
                        {stream &&
                            <video playsInline muted ref={myVideo} autoPlay style={{ width: '100%' }} />
                        }
                    </div>
                    <div className="video">
                        {callAccepted && !callEnded ?
                            <video playsInline ref={userVideo} autoPlay style={{ width: "100%" }} /> :
                            null}
                    </div>
                </div>

                <div className="chat-board">
                    <input
                        type="text"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* For Testing Only */}
                    <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                        <button onClick={() => {
                            window.alert("me", me)
                        }}>
                            Copy ID
                        </button>
                    </CopyToClipboard>
                    {/* For Testing Only */}

                    <input
                        type="text"
                        label="ID to call"
                        value={idToCall}
                        onChange={(e) => setIdToCall(e.target.value)}
                    />

                    <div className="call-button">
                        {
                            callAccepted && !callEnded ? (
                                <button onClick={leaveCall}>
                                    End Call
                                </button>
                            ) : (
                                <button onClick={() => callUser(idToCall)}>
                                    Call
                                </button>
                            )
                        }

                        {idToCall}
                    </div>
                </div>

                <div>
                    {
                        receivingCall && !callAccepted ? (
                            <div className="caller">
                                <h1>{name} is calling...</h1>
                                <button onClick={answerCall}>
                                    Answer
                                </button>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default VideoCall