import React, { useEffect, useRef, useState } from 'react';
import './ImageCapture.css';

const ImageCapture = React.memo(() => {
  const videoRef = useRef();
  const snapshotImage = useRef();
  const [videoData, setVideoData] = useState({
    active: false,
    error: '',
  });

  useEffect(() => {
    const fetchCameraData = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { deviceId: '' },
        });

        videoRef.current.srcObject = stream;
        setVideoData({ ...videoData, active: stream.active });
        videoRef.current.play();
        console.log(stream);
      } catch (e) {
        console.log('error fetching data');
        setVideoData({ ...videoData, error: 'error fetching data' });
      }
    };
    if (!videoData.active) {
      fetchCameraData();
    }
  }, []);

  const captureImage = () => {
    if (videoRef.current.srcObject) {
      const getSnapshot = snapshotImage.current.getContext('2d');
      getSnapshot.drawImage(videoRef.current, 0, 0, 900, 700);
    }
  };

  console.log(videoData.active);
  return (
    <div className='container'>
      <h1>Image Capture</h1>
      <div className='video-capture'>
        {!videoData.error ? (
          <>
            <video width='100%' height='700' ref={videoRef} />
            <button onClick={captureImage}>Capture Image</button>
          </>
        ) : (
          <p class='error'>{videoData.error}</p>
        )}
      </div>
      <div className='snapshot-image'>
        <canvas height='700' width='900' ref={snapshotImage} />
      </div>
    </div>
  );
});

export default ImageCapture;
