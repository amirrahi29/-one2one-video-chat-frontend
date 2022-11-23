import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SocketContext = createContext();

//const socket = io('http://localhost:5000');
const socket = io('https://video-call-apps.herokuapp.com/');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [userStream, setUserStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const [myAudioEnable, setMyAudio] = useState(true);
  const [userAudioEnabled, setUserAudio] = useState(true);
  const [myVideoEnabled, setMyVideo] = useState(true);
  const [userVideoEnabled, setUserVideo] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const toggleMyVideo = () => {
    const videoTrack = stream.getTracks().find(track => track.kind === 'video');
    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      setMyVideo(false);
    } else {
      videoTrack.enabled = true;
      setMyVideo(true);
    }
  }

  const toggleMyAudio = () => {
    const audioTrack = stream.getTracks().find(track => track.kind === 'audio');
    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      setMyAudio(false);
    } else {
      audioTrack.enabled = true;
      setMyAudio(true);
    }
  }

  const toggleUserVideo = () => {
    const videoTrack = userStream.getTracks().find(track => track.kind === 'video');
    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      setUserVideo(false);
    } else {
      videoTrack.enabled = true;
      setUserVideo(true);
    }
  }

  const toggleUserAudio = () => {
    const audioTrack = userStream.getTracks().find(track => track.kind === 'audio');
    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      setUserAudio(false);
    } else {
      audioTrack.enabled = true;
      setUserAudio(true);
    }
  }

  const answerCall = () => {
    toast.success(`Answered...`);
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
      setUserStream(currentStream);
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const declineCall = () => {
    toast.error(`Call declined`);
    console.log('declined');
    setCall({ isReceivingCall: false });
    setCallAccepted(false);
    setCallStarted(false);
  };

  const callUser = (id) => {
    toast.success(`Hey ${name}! Calling ....`);
    setCallStarted(true);
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      setCallStarted(false);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    toast.error(`Call ended`);
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      callStarted,
      declineCall,
      toggleMyVideo,
      toggleMyAudio,
      toggleUserVideo,
      toggleUserAudio,
      userStream,
      myAudioEnable,
      userAudioEnabled,
      myVideoEnabled,
      userVideoEnabled
    }}
    >
      {children}
      <ToastContainer />
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
