import React, { createContext, useState, useEffect, useRef } from 'react'
import Peer from 'simple-peer'
import io from 'socket.io-client'

//testing only
import './video.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const VideoCall = createContext()
const socket = io.connect('http://localhost:8001')

const ContextProvider = ({ children }) => {
	socket.on('connect_error', err => {
		console.log(`connect_error due to ${err.message}`)
	})

	const [me, setMe] = useState('')
	const [stream, setStream] = useState()
	const [receivingCall, setReceivingCall] = useState(false)
	const [caller, setCaller] = useState('')
	const [callerSignal, setCallerSignal] = useState()
	const [callAccepted, setCallAccepted] = useState(false)
	const [idToCall, setIdToCall] = useState('')
	const [callEnded, setCallEnded] = useState(false)
	const [name, setName] = useState('')
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef = useRef()

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({
				video: true,
				audio: true,
			})
			.then(stream => {
				setStream(stream)
				myVideo.current.srcObject = stream
			})

		socket.on('Current User', id => {
			setMe(id)
			console.log(id)
		})

		socket.on('calluser', data => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})
	}, [])

	const callUser = id => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		})

		peer.on('signal', data => {
			socket.emit('calluser', {
				userToCall: id,
				signalData: data,
				from: me,
				name: name,
			})
		})

		peer.on('stream', stream => {
			userVideo.current.srcObject = stream
		})

		socket.on('callaccepted', signal => {
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
			stream: stream,
		})

		peer.on('signal', data => {
			socket.emit('answercall', {
				signal: data,
				to: caller,
			})
		})

		peer.on('stream', stream => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}

	const toggleCamera = () => {
		MediaStream.getVideoTracks()[0].enabled = !MediaStream.getVideoTracks()[0].enabled
	}

	const toggleAudio = () => {
		MediaStream.getAudioTracks()[0].enabled = !MediaStream.getAudioTracks()[0].enabled
	}

	return (
		<VideoCall.Provider
			value={{
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
				toggleAudio,
				toggleCamera,
			}}
		>
			{children}
		</VideoCall.Provider>
	)
}

export { ContextProvider, VideoCall }
