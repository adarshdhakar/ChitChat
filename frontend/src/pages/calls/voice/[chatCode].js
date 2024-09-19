import React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage = () => {
    const roomId = "Hello";
    const myMeeting = async (element) => {
        const appID = 790086600;
        const serverSecret = "b24650dc99003a99a586c62260136b28";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID, 
            serverSecret, 
            roomId, 
            Date.now().toString(),  
            "Adarsh"
        );
    
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
        });
    };

    return 
    <div>
        <div ref = {myMeeting}/>
    </div>
};

export default RoomPage;