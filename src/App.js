import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import Sidebar from './components/Sidebar';
import Notifications from './components/Notifications';

const App = () => {
 
  return (
    <div className='container' style={{display:'flex',flexDirection:'column',alignContent:'center'}}>
      <h2 style={{alignSelf:'center'}}>Rojkharido Video Verification</h2>
      <hr/>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
};

export default App;
