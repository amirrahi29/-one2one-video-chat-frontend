import React, { useContext } from 'react';
import { SocketContext } from '../Context';
import { FaHouseUser } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa";

const VideoPlayer = () => {

  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, toggleMyVideo,
    toggleMyAudio, toggleUserVideo, toggleUserAudio, myAudioEnable, userAudioEnabled,
    myVideoEnabled, userVideoEnabled } = useContext(SocketContext);

  return (
    <div className='container'>
      {stream &&
        <div className='row'>
          <div className='col-md-6'>

            <video playsInline muted ref={myVideo} autoPlay style={{
              background: 'black',
              margin: 8, padding: 12, borderRadius: 8, height: '350px', width: '100%'
            }} />

            <div className='row' style={{ cursor: 'pointer' }}>
              <div className='col-md-5'>
                <h5><FaHouseUser /> &nbsp;{name || 'Name'}</h5>
              </div>
              <div className='col-md-1'>
                <h5 onClick={toggleMyAudio}>
                  {
                    myAudioEnable ?
                      <FaMicrophone style={{
                        background: 'red', color: 'white', borderRadius: '8px',
                        padding: '10px', height: '40px', width: '40px'
                      }} />
                      :
                      <FaMicrophoneSlash style={{
                        background: 'red', color: 'white', borderRadius: '8px',
                        padding: '10px', height: '40px', width: '40px'
                      }} />
                  }

                </h5>
              </div>
              <div className='col-md-1'>
                <h5 onClick={toggleMyVideo}>
                  {
                    myVideoEnabled ?
                      <FaVideo style={{
                        background: 'red', color: 'white', borderRadius: '8px',
                        padding: '10px', height: '40px', width: '40px'
                      }} />
                      :
                      <FaVideoSlash style={{
                        background: 'red', color: 'white', borderRadius: '8px',
                        padding: '10px', height: '40px', width: '40px'
                      }} />
                  }
                </h5>
              </div>
              <div className='col-md-5'></div>
            </div>

          </div>

          {callAccepted && !callEnded &&
            <div className='col-md-6'>

              <video playsInline ref={userVideo} autoPlay style={{
                background: 'black',
                margin: 8, padding: 12, borderRadius: 8, height: '350px', width: '100%'
              }} />

              <div className='row' style={{ cursor: 'pointer' }}>
                <div className='col-md-5'>
                  <h5><FaUserSecret />{call.name || 'Name'}</h5>
                </div>
                <div className='col-md-1'>
                  <h5 onClick={toggleUserAudio}>
                    {
                      userAudioEnabled ?
                        <FaMicrophone style={{
                          background: 'red', color: 'white', borderRadius: '8px',
                          padding: '10px', height: '40px', width: '40px'
                        }} />
                        :
                        <FaMicrophoneSlash style={{
                          background: 'red', color: 'white', borderRadius: '8px',
                          padding: '10px', height: '40px', width: '40px'
                        }} />
                    }

                  </h5>
                </div>
                <div className='col-md-1'>
                  <h5 onClick={toggleUserVideo}>
                    {
                      userVideoEnabled ?
                        <FaVideo style={{
                          background: 'red', color: 'white', borderRadius: '8px',
                          padding: '10px', height: '40px', width: '40px'
                        }} />
                        :
                        <FaVideoSlash style={{
                          background: 'red', color: 'white', borderRadius: '8px',
                          padding: '10px', height: '40px', width: '40px'
                        }} />
                    }
                  </h5>
                </div>
                <div className='col-md-5'></div>
              </div>

            </div>
          }
        </div>
      }
    </div>
  );
};

export default VideoPlayer;
