import React, { useEffect, useRef, useState, useMemo } from 'react';

const ImageCapture = React.memo(() => {
  const videoRef = useRef();
  const snapshotImage = useRef();
  const [videoData, setVideoData] = useState({ active: false });

  useEffect(() => {
    const fetchCameraData = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { deviceId: '' },
      });

      videoRef.current.srcObject = stream;
      setVideoData({ ...videoData, active: stream.active });
      videoRef.current.play();
    };

    if (!videoData.active) {
      fetchCameraData();
    }
  }, []);

  const captureImage = () => {
    const getSnapshot = snapshotImage.current.getContext('2d');

    getSnapshot.drawImage(videoRef, 0, 0);
  };

  return (
    <div className='video-capture'>
      <video width='100%' height='700' ref={videoRef} />
      <button onClick={captureImage}>Capture Image</button>

      <div className='snapshot-image'>
        <canvas width='100%' height='700' ref={snapshotImage} />
      </div>
    </div>
  );
});

export default ImageCapture;
