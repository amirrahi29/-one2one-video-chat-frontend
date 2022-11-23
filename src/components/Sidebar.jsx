import React, { useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCopy } from "react-icons/fa";

const Sidebar = ({ children }) => {

  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, call, callStarted, declineCall } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  const checkCredentials = () => {
    if (idToCall && name) {
      callUser(idToCall);
    }
    else {
      toast.error("Name and meeting id are required!");
    }
  }

  return (

    <div className='container' style={{ flex: 1, flexDirection: 'row', width: '400px' }}>
      {children}
      <div style={{ background: 'black', padding: 16, borderRadius: 16, color: 'white' }}>
        <p style={{ cursor: 'pointer' }}>Meeting ID : {me} <CopyToClipboard text={me}><FaCopy fontSize="small" />
        </CopyToClipboard> </p><hr />
        <div className='row'>
          <div className='col-md-6'>
            <label>Name</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='form-control' placeholder='Enter your name' />
          </div>
          <div className='col-md-6'>
            <label>Meeting ID</label>
            <input type='text' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} className='form-control' placeholder='Enter meeting ID' />
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-md-12'>
            {callAccepted && !callEnded ? (
              <button onClick={leaveCall} className='form-control' style={{ background: 'red', color: 'white' }}>Hang Up</button>
            ) :

              call.isReceivingCall ?
                <p>Please accept or decline this call....</p>
                : callStarted ?
                  <div>
                    <center>
                      <div className="spinner-border" role="status"></div>
                      <p style={{ color: 'white' }}>&nbsp;Waiting to Accept / Decline.....</p>
                    </center>
                    <div className='row'>
                      <div className='col-md-12'>
                        <button onClick={declineCall} className='form-control' style={{ background: 'green', color: 'white' }}>Call again!</button>
                      </div>
                    </div>
                  </div>
                  :
                  <button onClick={checkCredentials} className='form-control' style={{ background: 'green', color: 'white' }}>Call Now</button>
            }
          </div>
        </div>
      </div>
      <ToastContainer />
      <br /><br /><br />
    </div>
  );
};

export default Sidebar;
