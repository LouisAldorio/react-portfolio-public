import React from "react";

import Song from "./song";
import Play from "./play";
import Pause from "./pause";
import Bar from "./bar";

import './styles.css'

import useAudioPlayer from '../useAudioPlayer';

function Audio(props) {
  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer(props);

  return (
    <div className="player" style={{backgroundImage: `url(${props.song.cover})`}}>
      <audio id={props.song.id}>
        <source src={props.song.src} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Song songName={props.song.title} songArtist={props.song.author} />
      <div className="controls">
        {playing ? 
          <Pause handleClick={() => setPlaying(false)} /> :
          <Play handleClick={() => setPlaying(true)} />
        }
        <Bar  curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} src={props.song.src}/>
      </div>
    </div>
  );
}

export default Audio;
