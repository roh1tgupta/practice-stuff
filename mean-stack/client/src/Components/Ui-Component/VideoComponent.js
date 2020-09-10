import React, { useRef, useEffect, useState } from 'react';
import './VideoComponent.css';

const VideoComponent = (props) => {
  const { item, lastActiveVideo = {} } =  props;
  const videoPlayer = useRef();
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);


  const getElemDistance = elem => {
    let location = 0;
    if (elem.offsetParent) {
        do {
            location += elem.offsetTop;
            elem = elem.offsetParent;
        } while (elem);
    }
    return location >= 0 ? location : 0;
  };

  const EnterFullScreen = (id) => {
    videoPlayer.current.requestFullscreen();
  };

  const EnterPIP = () => {
    videoPlayer.current.requestPictureInPicture();
  };

  const handleVolume = () => {
    if (videoPlayer.current.volume < 1)
      videoPlayer.current.volume += Math.min(0.1, 1 - videoPlayer.current.volume);
  };

  const handlePlay = (id) => {
    if (lastActiveVideo && videoPlayer.current.id === lastActiveVideo.id) {
       videoPlayer.current[`${!isPlaying ? 'play' : 'pause'}`]();
       setIsPlaying(!isPlaying);
    } else {
      // setShowPlayButton(false);
      // setIsPlaying(!isPlaying);/
      // document.getElementById(id).controls = true; // remove all other and enable thiss
      props.handlePlay(id);
    }
    
  }

  return (
    <React.Fragment>
  <figure className="vidFrame">
    <video ref={videoPlayer} id={item._id} src={item.photo} width="500" type="video/ogg" controls></video>
    {/* {
      true && <figcaption className="vidBar">
          <i class="material-icons" onClick={() => handlePlay(item._id)}>{
            isPlaying ? 'pause' : 'play_arrow'
          }</i>
          <i class="material-icons" onClick={() => handleVolume(item._id)}>volume_up</i>
          <i class="material-icons" onClick={() => EnterFullScreen(item._id)}>fullscreen</i>
          <i class="material-icons" onClick={() => EnterPIP(item._id)}>picture_in_picture</i>
    </figcaption>
    } */}
    
  </figure>
  {/* {
    showPlayButton && <div className="play_icon"><i class="material-icons" onClick={() => handlePlay(item._id)}>play_arrow</i>
    </div>
  } */}
  
  </React.Fragment>);
}

export default VideoComponent;