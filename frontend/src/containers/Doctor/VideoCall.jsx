import { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';

import { PhoneIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';

//testing only
import axios from 'axios';

const baseURL = 'http://localhost:8001';

const socket = io.connect(`${baseURL}`);

const VideoCall = () => {
	socket.on('connect_error', (err) => {
		console.log(`connect_error due to ${err.message}`);
	});

	const [me, setMe] = useState('');
	const [stream, setStream] = useState();
	const [receivingCall, setReceivingCall] = useState(false);
	const [caller, setCaller] = useState('');
	const [callerSignal, setCallerSignal] = useState();
	const [callAccepted, setCallAccepted] = useState(false);
	const [idToCall, setIdToCall] = useState('');
	const [callEnded, setCallEnded] = useState(false);
	const [name, setName] = useState('');
	const myVideo = useRef(null);
	const userVideo = useRef(null);
	const connectionRef = useRef();
	const [roomId, setRoomId] = useState('');

	const getRoom = async () => {
		const response = await axios.get(`${baseURL}/video`);
		setRoomId(response.data.roomId);
	};

	useEffect(() => {
		getRoom();
	}, []);

	useEffect(() => {
		const myPeer = new Peer(undefined, {
			host: '/',
			port: '3001',
		});

		myPeer.on('open', (id) => {
			socket.emit('join-room', roomId, id);
		});

		socket.on('user-connected', (userId) => {
			console.log('User connected: ' + userId);
		});
	});

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({
				video: true,
				audio: true,
			})
			.then((stream) => {
				setStream(stream);
				myVideo.current.srcObject = stream;
			});
	}, [roomId, myVideo, userVideo]);

	return (
		<Box>
			<h1 style={{ textAlign: 'center', color: '#fff' }}>Zoomish</h1>
			<Box className="container">
				<Box className="video-container">
					<Box className="video">
						{stream && (
							<video
								playsInline
								muted
								ref={myVideo}
								autoPlay
								style={{ width: '300px' }}
							/>
						)}
					</Box>
					<Box className="video">
						{callAccepted && !callEnded ? (
							<video
								playsInline
								ref={userVideo}
								autoPlay
								style={{ width: '300px' }}
							/>
						) : null}
					</Box>
				</Box>
				<Box className="myId">
					<input
						id="filled-basic"
						label="Name"
						variant="filled"
						value={name}
						onChange={(e) => setName(e.target.value)}
						style={{ marginBottom: '20px' }}
					/>

					<input
						id="filled-basic"
						label="ID to call"
						variant="filled"
						value={idToCall}
						onChange={(e) => setIdToCall(e.target.value)}
					/>
					<Box className="call-button">
						{callAccepted && !callEnded ? (
							<Button variant="contained" color="secondary">
								End Call
							</Button>
						) : (
							<PhoneIcon fontSize="large" />
						)}
						{idToCall}
					</Box>
				</Box>
				<Box>
					{receivingCall && !callAccepted ? (
						<Box className="caller">
							<h1>{name} is calling...</h1>
							<button variant="contained" color="primary">
								Answer
							</button>
						</Box>
					) : null}
				</Box>
			</Box>
		</Box>
	);
};

export default VideoCall;
