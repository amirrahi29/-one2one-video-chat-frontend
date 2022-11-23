import React, { useContext } from 'react';
import { SocketContext } from '../Context';

const Notifications = () => {
  const { answerCall, call, callAccepted, declineCall } = useContext(SocketContext);

  return (
    <>
      {
        call.isReceivingCall && !callAccepted &&
        <div className='container' style={{ backgroundColor: 'white', height: '50px' }}>
          <div className='row' style={{ padding: 8 }}>
            <div className='col-md-6'>
              <p>{call.name} is calling...</p>
            </div>
            <div className='col-md-3'>
              <span><button className='btn btn-danger' onClick={declineCall}>Decline</button></span>
            </div>
            <div className='col-md-3'>
              <span><button className='btn btn-success' onClick={answerCall}>Accept</button></span>
            </div>
          </div>
        </div>
      }

    </>
  );
};

export default Notifications;
