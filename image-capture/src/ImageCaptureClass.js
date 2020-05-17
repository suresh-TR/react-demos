import React, { Component } from 'react';

export class ImageCaptureClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this.videoRef = React.createRef();
    this.snapshotImage = React.createRef();
  }

  async componentDidMount() {
    if (!this.state.active) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { deviceId: '' },
      });

      this.videoRef.current.srcObject = stream;
      this.setState({ active: stream.active });
      this.videoRef.current.play();
      console.log(stream);
    }
  }

  captureImage = () => {
    const getSnapshot = this.snapshotImage.current.getContext('2d');

    getSnapshot.drawImage(this.videoRef, 0, 0);
  };

  render() {
    return (
      <div className='video-capture'>
        <video width='100%' height='700' ref={this.videoRef} />
        <button onClick={this.captureImage}>Capture Image</button>

        <div className='snapshot-image'>
          <canvas width='100%' height='700' ref={this.snapshotImage} />
        </div>
      </div>
    );
  }
}

export default ImageCaptureClass;
