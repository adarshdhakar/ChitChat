import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import styles from '../../../styles/VideoCall.module.css';
import Link from 'next/link';

const SOCKET_SERVER_URL = "http://localhost:5000";

const VideoCallPage = () => {
    const router = useRouter();
    const { chatCode } = router.query;
    const localVideoRef = useRef(null);
    const remoteVideosRef = useRef([]); // Change to handle multiple remote videos
    const socketRef = useRef(null);
    const peerConnections = useRef({});
    const [localStream, setLocalStream] = useState(null);
    const [remoteStreams, setRemoteStreams] = useState([]); // To store multiple remote streams
    const [isCaller, setIsCaller] = useState(false);

    const ICE_SERVERS = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
        ],
    };

    useEffect(() => {
        if (!chatCode) return;

        socketRef.current = io(SOCKET_SERVER_URL, {
            transports: ["websocket"],
            query: { room: chatCode },
        });

        socketRef.current.emit('join_room', chatCode);

        socketRef.current.on('video_offer', handleReceiveOffer);
        socketRef.current.on('video_answer', handleReceiveAnswer);
        socketRef.current.on('video_candidate', handleReceiveCandidate);
        socketRef.current.on('room_users', handleRoomUsers);
        socketRef.current.on('user_joined', handleUserJoined);

        socketRef.current.emit('get_room_users', chatCode);

        return () => {
            socketRef.current.emit('leave_room', chatCode);
            socketRef.current.disconnect();
            Object.values(peerConnections.current).forEach(pc => pc.close());
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [chatCode]);

    useEffect(() => {
        if (socketRef.current) {
            setupLocalMedia();
        }
    }, [socketRef.current]);

    const setupLocalMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream);
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }

            const peerConnection = new RTCPeerConnection(ICE_SERVERS);
            peerConnections.current[socketRef.current.id] = peerConnection;
            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

            peerConnection.ontrack = handleRemoteStream;
            peerConnection.onicecandidate = handleICECandidateEvent;

            if (isCaller) {
                setTimeout(() => {
                    initiateCall(peerConnection);
                }, 1000);
            }
        } catch (err) {
            console.error('Error accessing media devices.', err);
            alert('Could not access your camera and microphone. Please check permissions.');
        }
    };

    const initiateCall = async (peerConnection) => {
        try {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            socketRef.current.emit('video_offer', { offer, room: chatCode });
        } catch (err) {
            console.error('Error initiating call:', err);
        }
    };

    const handleRoomUsers = (users) => {
        users.forEach(user => {
            if (user !== socketRef.current.id) {
                createPeerConnection(user);
            }
        });
    };

    const handleUserJoined = (data) => {
        createPeerConnection(data.userId);
    };

    const createPeerConnection = (userId) => {
        const peerConnection = new RTCPeerConnection(ICE_SERVERS);
        peerConnections.current[userId] = peerConnection;

        if (localStream) {
            localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
        }

        peerConnection.ontrack = handleRemoteStream;
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('video_candidate', { candidate: event.candidate, room: chatCode });
            }
        };

        return peerConnection;
    };

    const handleReceiveOffer = async (data) => {
        const { offer, sender } = data;
        let peerConnection = peerConnections.current[sender];
        if (!peerConnection) {
            peerConnection = createPeerConnection(sender);
        }

        try {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socketRef.current.emit('video_answer', { answer, room: chatCode });
        } catch (err) {
            console.error('Error handling offer:', err);
        }
    };

    const handleReceiveAnswer = async (data) => {
        const { answer, sender } = data;
        const peerConnection = peerConnections.current[sender];
        if (peerConnection) {
            try {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
            } catch (err) {
                console.error('Error setting remote description:', err);
            }
        }
    };

    const handleICECandidateEvent = (event) => {
        if (event.candidate) {
            socketRef.current.emit('video_candidate', { candidate: event.candidate, room: chatCode });
        }
    };

    const handleReceiveCandidate = async (data) => {
        const { candidate, sender } = data;
        const peerConnection = peerConnections.current[sender];
        if (peerConnection) {
            try {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (err) {
                console.error('Error adding received ICE candidate', err);
            }
        }
    };

    const handleRemoteStream = (event) => {
        const [stream] = event.streams;
        setRemoteStreams(prevStreams => [...prevStreams, stream]);
    };

    return (
        <div className={styles.videoCallContainer}>
            <div className={styles.videoWrapper}>
                <div className={styles.localVideo}>
                    <video ref={localVideoRef} autoPlay playsInline />
                    <p>Your Video</p>
                </div>
                {remoteStreams.map((stream, index) => (
                    <div key={index} className={styles.remoteVideo}>
                        <video ref={el => (remoteVideosRef.current[index] = el)} autoPlay playsInline srcObject={stream} />
                        <p>Remote Video {index + 1}</p>
                    </div>
                ))}
            </div>
            <div className={styles.controls}>
                <Link href={`/chat/${chatCode}`}>
                    <button className={styles.leaveButton}>Leave Call</button>
                </Link>
            </div>
        </div>
    );
};

export default VideoCallPage;

