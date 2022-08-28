import React from 'react';
import './styles.css'

function Song(props) {
  const { songName, songArtist } = props;
  
  return (
    <div className="song">
      <h5 className="song__title">{songName}</h5>
      <h6 className="song__artist">{songArtist}</h6>
    </div>
  )
}

export default Song;