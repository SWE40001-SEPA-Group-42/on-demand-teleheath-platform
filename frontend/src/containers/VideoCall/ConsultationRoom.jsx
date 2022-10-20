import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import {
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsChatDotsFill,
  BsFillArrowRightSquareFill,
  BsFillMicFill,
  BsMicMuteFill,
  BsPersonPlusFill,
} from 'react-icons/bs';
import { MdCallEnd } from 'react-icons/md';
import VideoCallControls from './VideoCallControls';

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
    props.peer.on('stream', (stream) => {
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
    socketRef.current = io.connect('localhost:8000');
    console.log(socketRef);
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        setLocalStream(stream);
        socketRef.current.emit('join room', roomID);
        socketRef.current.on('all users', (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
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

        socketRef.current.on('user joined', (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
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

        socketRef.current.on('receiving returned signal', (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on('user left', (id) => {
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }

          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
        });
      });
  }, []);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('returning signal', { signal, callerID });
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

  const toggleVideo = (userStream) => {
    // const localVideo = userStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
    // userStream.getVideoTracks().forEach(track => !track.enabled);
    const userVideo = userStream.getVideoTracks()[0];

    if (userVideo.enabled) {
      setVideoCallState({
        ...videoCallState,
        isCameraOn: !videoCallState.isCameraOn,
      });
      userVideo.enabled = false;
      console.log(videoCallState.isCameraOn);
    } else {
      setVideoCallState({
        ...videoCallState,
        isCameraOn: !videoCallState.isCameraOn,
      });
      userVideo.enabled = true;
      console.log(videoCallState.isCameraOn);
    }

    console.log('Video is enabled: ' + videoCallState.isCameraOn);
  };

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

    console.log('Mic is enabled: ' + videoCallState.isMuted);
  };

  const leaveCall = () => {
    setVideoCallState({
      ...videoCallState,
      isCallEnded: !videoCallState.isCallEnded,
    });
    socketRef.current.destroy();
    console.log(socketRef);
    navigate('/home');
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
                  videoCallState.isCameraOn ? 'video-cam-on' : 'video-cam-off'
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
                          ? 'video-cam-on'
                          : 'video-cam-off'
                      }`}
                    key={peer.peerID}
                    peer={peer.peer}
                    ref={callerVideo}
                  />
                );
              })}
              {console.log('Number of peers: ' + peers.length)}
            </Box>
          </Box>
          <Box className="video-call-options">
            <Box className="video-call-options-left">
              <Box id="video-button" className="options-button">
                <IconButton
                  isRound
                  onClick={() => toggleVideo(localStream)}
                  colorScheme={videoCallState.isCameraOn ? 'green' : 'red'}
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
                  colorScheme={videoCallState.isMuted ? 'red' : 'green'}
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
            {/* <Box className="video-call-options-right">
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
              </Box> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ConsultationRoom;
