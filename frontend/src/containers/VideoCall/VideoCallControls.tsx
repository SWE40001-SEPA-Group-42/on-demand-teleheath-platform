import React from 'react';
import { useNavigate } from 'react-router-dom';
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
	BsChatDotsFill,
	BsFillArrowRightSquareFill,
	BsPersonPlusFill,
} from 'react-icons/bs';
import { FaVideo, FaMicrophone } from 'react-icons/fa';
import { MdCallEnd } from 'react-icons/md';

const VideoCallControls = () => {
	const navigate = useNavigate();

	// const stopVideoStream = (userVideo) => {
	// 	console.log('Turn off video button clicked');
	// 	const videoStream = userVideo.srcObject;
	// 	const tracks = videoStream.getTracks();

	// 	tracks.forEach((track) => {
	// 		track.stop();
	// 	});

	// 	userVideo.srcObject = null;
	// };

	return (
		<Box className="video-call-controls-container">
			<Box className="video-call-options">
				<Box className="video-call-options-left">
					<Box id="video-button" className="options-button">
						<IconButton
							colorScheme="green"
							aria-label="Turn video off"
							size="lg"
							icon={<FaVideo />}
						/>
					</Box>
					<Box id="mic-button" className="options-button">
						<IconButton
							colorScheme="green"
							aria-label="Turn microphone on"
							size="lg"
							icon={<FaMicrophone />}
						/>
					</Box>
					<Box id="chat-button" className="options-button">
						<IconButton
							variant="outline"
							colorScheme="green"
							aria-label="Turn chat on"
							size="lg"
							icon={<BsChatDotsFill />}
						/>
					</Box>
					<Box id="end-call-button" className="options-button">
						<IconButton
							onClick={() => navigate('/home')}
							colorScheme="red"
							aria-label="Leave call"
							size="lg"
							icon={<MdCallEnd />}
						/>
					</Box>
				</Box>
				<Box className="video-call-options-right">
					<Box id="invite-button" className="options-button">
						<IconButton
							colorScheme="blue"
							aria-label="Invite participant"
							size="lg"
							icon={<BsPersonPlusFill />}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default VideoCallControls;
