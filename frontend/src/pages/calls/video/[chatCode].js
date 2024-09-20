// // pages/calls/video/[chatCode].js
// import React, { useEffect, useRef, useState } from 'react';
// import { useRouter } from 'next/router';
// import io from 'socket.io-client';
// import styles from '../../../styles/VideoCall.module.css'; // Create appropriate CSS
// import Link from 'next/link';

// const SOCKET_SERVER_URL = "http://localhost:5000"; // Update with your backend server URL

// const VideoCallPage = () => {
//     const router = useRouter();
//     const { chatCode } = router.query;
//     const localVideoRef = useRef(null);
//     const remoteVideoRef = useRef(null);
//     const socketRef = useRef(null);
//     const peerConnections = useRef({}); // To handle multiple peer connections if needed
//     const [localStream, setLocalStream] = useState(null);
//     const [remoteStream, setRemoteStream] = useState(null);
//     const [isCaller, setIsCaller] = useState(false); // Determine if the user initiates the call

//     const ICE_SERVERS = {
//         iceServers: [
//             { urls: 'stun:stun.l.google.com:19302' }, // Google's public STUN server
//             // Add TURN servers here if needed for better NAT traversal
//         ],
//     };

//     useEffect(() => {
//         if (!chatCode) return;

//         // Initialize Socket.io
//         socketRef.current = io(SOCKET_SERVER_URL, {
//             transports: ["websocket"],
//             query: { room: chatCode },
//         });

//         // Join the room
//         socketRef.current.emit('join_room', chatCode);

//         // Handle incoming video offers
//         socketRef.current.on('video_offer', handleReceiveOffer);

//         // Handle incoming video answers
//         socketRef.current.on('video_answer', handleReceiveAnswer);

//         // Handle incoming ICE candidates
//         socketRef.current.on('video_candidate', handleReceiveCandidate);

//         // Listen for room users to determine if current user is the caller
//         socketRef.current.on('room_users', (users) => {
//             // If only one user (self) is in the room, set as caller
//             if (users.length === 1) {
//                 setIsCaller(true);
//             } else {
//                 setIsCaller(false);
//             }
//         });

//         // Get the list of users in the room
//         socketRef.current.emit('get_room_users', chatCode);

//         // Cleanup on unmount
//         return () => {
//             socketRef.current.emit('leave_room', chatCode);
//             socketRef.current.disconnect();
//             // Close all peer connections
//             Object.values(peerConnections.current).forEach(pc => pc.close());
//             if (localStream) {
//                 localStream.getTracks().forEach(track => track.stop());
//             }
//             if (remoteStream) {
//                 remoteStream.getTracks().forEach(track => track.stop());
//             }
//         };
//     }, [chatCode]);

//     useEffect(() => {
//         if (socketRef.current) {
//             setupLocalMedia();
//         }
//     }, [socketRef.current]);

//     const setupLocalMedia = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//             setLocalStream(stream);
//             if (localVideoRef.current) {
//                 localVideoRef.current.srcObject = stream;
//             }

//             // Initialize RTCPeerConnection
//             const peerConnection = new RTCPeerConnection(ICE_SERVERS);
//             peerConnections.current[socketRef.current.id] = peerConnection;

//             // Add local tracks to peer connection
//             stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

//             // Handle incoming tracks
//             peerConnection.ontrack = handleRemoteStream;

//             // Handle ICE candidates
//             peerConnection.onicecandidate = handleICECandidateEvent;

//             // If caller, initiate the offer after a slight delay to ensure both peers are ready
//             if (isCaller) {
//                 // Wait for other users to join
//                 setTimeout(() => {
//                     initiateCall(peerConnection);
//                 }, 1000); // Adjust the delay as needed
//             }
//         } catch (err) {
//             console.error('Error accessing media devices.', err);
//             alert('Could not access your camera and microphone. Please check permissions.');
//         }
//     };

//     const initiateCall = async (peerConnection) => {
//         try {
//             const offer = await peerConnection.createOffer();
//             await peerConnection.setLocalDescription(offer);
//             socketRef.current.emit('video_offer', { offer, room: chatCode });
//         } catch (err) {
//             console.error('Error initiating call:', err);
//         }
//     };

//     const handleReceiveOffer = async (data) => {
//         const { offer, sender } = data;
//         console.log(`Received offer from ${sender}`);

//         // Check if a peer connection already exists with the sender
//         let peerConnection = peerConnections.current[sender];
//         if (!peerConnection) {
//             peerConnection = new RTCPeerConnection(ICE_SERVERS);
//             peerConnections.current[sender] = peerConnection;

//             // Add local tracks to peer connection
//             if (localStream) {
//                 localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
//             }

//             // Handle incoming tracks
//             peerConnection.ontrack = handleRemoteStream;

//             // Handle ICE candidates
//             peerConnection.onicecandidate = (event) => {
//                 if (event.candidate) {
//                     socketRef.current.emit('video_candidate', { candidate: event.candidate, room: chatCode });
//                 }
//             };
//         }

//         try {
//             await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
//             const answer = await peerConnection.createAnswer();
//             await peerConnection.setLocalDescription(answer);
//             socketRef.current.emit('video_answer', { answer, room: chatCode });
//         } catch (err) {
//             console.error('Error handling offer:', err);
//         }
//     };

//     const handleReceiveAnswer = async (data) => {
//         const { answer, sender } = data;
//         console.log(`Received answer from ${sender}`);

//         const peerConnection = peerConnections.current[sender];
//         if (!peerConnection) {
//             console.error('PeerConnection not found for sender:', sender);
//             return;
//         }

//         try {
//             await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//         } catch (err) {
//             console.error('Error setting remote description:', err);
//         }
//     };

//     const handleICECandidateEvent = (event) => {
//         if (event.candidate) {
//             socketRef.current.emit('video_candidate', { candidate: event.candidate, room: chatCode });
//         }
//     };

//     const handleReceiveCandidate = async (data) => {
//         const { candidate, sender } = data;
//         console.log(`Received ICE candidate from ${sender}`);

//         const peerConnection = peerConnections.current[sender];
//         if (!peerConnection) {
//             console.error('PeerConnection not found for sender:', sender);
//             return;
//         }

//         try {
//             await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//         } catch (err) {
//             console.error('Error adding received ICE candidate', err);
//         }
//     };

//     const handleRemoteStream = (event) => {
//         const [stream] = event.streams;
//         if (remoteVideoRef.current) {
//             remoteVideoRef.current.srcObject = stream;
//         }
//     };

//     return (
//         <div className={styles.videoCallContainer}>
//             <div className={styles.videoWrapper}>
//                 <div className={styles.localVideo}>
//                     <video ref={localVideoRef} autoPlay playsInline/>
//                     <p>Your Video</p>
//                 </div>
//                 <div className={styles.remoteVideo}>
//                     <video ref={remoteVideoRef} autoPlay playsInline />
//                     <p>Remote Video</p>
//                 </div>
//             </div>
//             <div className={styles.controls}>
//                 <Link href={`/chat/${chatCode}`}>
//                     <button className={styles.leaveButton}>Leave Call</button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default VideoCallPage;



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


// import React, { useEffect, useRef } from 'react';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { useRouter } from 'next/router';

// const RoomPage = () => {
//     const router = useRouter();
//     const { roomId } = router.query;
//     const meetingRef = useRef(null);

//     useEffect(() => {
//         if (roomId && meetingRef.current) {
//             myMeeting(meetingRef.current);
//         }
//     }, [roomId]);

//     const myMeeting = async (element) => {
//         const appID = 790086600;
//         const serverSecret = "b24650dc99003a99a586c62260136b28";
//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//             appID, 
//             serverSecret, 
//             roomId, 
//             Date.now().toString(),  
//             "Adarsh"
//         );
    
//         const zc = ZegoUIKitPrebuilt.create(kitToken);
//         zc.joinRoom({
//             container: element,
//             scenario: {
//                 mode: ZegoUIKitPrebuilt.OneONoneCall,
//             },
//         });
//     };

//     return (
//         <div>
//             <div ref={meetingRef} />
//         </div>
//     );
// };

// export default RoomPage;




