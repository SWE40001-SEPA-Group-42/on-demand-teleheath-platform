import React from 'react'
import { VideoCall } from './VideoCall'
import '../VideoCall/video.css'
import VideocamIcon from '@mui/icons-material/Videocam'
import MicIcon from '@mui/icons-material/Mic'
import CallIcon from '@mui/icons-material/Call'
import Button from '@chakra-ui/react'
const DoctorCall = () => {
	const {
		caller,
		callAccepted,
		myVideo,
		userVideo,
		stream,
		name,
		setName,
		callEnded,
		receivingCall,
		me,
		callUser,
		leaveCall,
		answerCall,
		toggleVideo,
		toggleAudio,
	} = useContext(VideoCall)
	return (
		<div className='container'>
			<h1 style={{ textAlign: 'center', color: '#fff' }}>You are in a call with {name}</h1>
			<div className='container'>
				<div className='video-container'>
					<div className='caller-video'>
						{stream && <video playsInline muted ref={myVideo} autoPlay />}
					</div>
					<div className='receiver-video'>
						{callAccepted && !callEnded ? <video playsInline ref={userVideo} autoPlay /> : null}
					</div>
				</div>
			</div>
			<div className='call-button'>
				<Button colorScheme='blue' variant='solid' w='100%' my={5} onClick={toggleVideo}>
					<VideocamIcon />
				</Button>
				<Button colorScheme='blue' variant='solid' w='100%' my={5} onClick={toggleAudio}>
					<MicIcon />
				</Button>
				<Button colorScheme='blue' variant='solid' w='100%' my={5} onClick={leaveCall}>
					<CallIcon />
				</Button>
			</div>
		</div>
	)
}

export default DoctorCall
