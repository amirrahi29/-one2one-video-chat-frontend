import React, { useContext } from 'react';
import { SocketContext } from '../Context';

const VideoPlayer = () => {

  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  return (
    <div className='container'>
      {stream &&
        <div className='row'>
          <div className='col-md-6'>
            <h3>{name || 'Name'}</h3>
            <video playsInline muted ref={myVideo} autoPlay style={{
              background: 'black',
              margin: 8, padding: 12, borderRadius: 8, height: '350px',width:'100%'
            }} />
          </div>

          {callAccepted && !callEnded &&
            <div className='col-md-6'>
              <h4>{call.name || 'Name'}</h4>
              <video playsInline ref={userVideo} autoPlay style={{
                background: 'black',
                margin: 8, padding: 12, borderRadius: 8, height: '350px',width:'100%'
              }} />
            </div>
          }
        </div>
      }
    </div>
  );
};

export default VideoPlayer;
