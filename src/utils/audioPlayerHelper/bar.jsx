import React from "react";
import moment from "moment";
// eslint-disable-next-line
import momentDurationFormatSetup from "moment-duration-format";
import './styles.css'
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles,IconButton,Grid } from "@material-ui/core";

const useStyles = makeStyles({
    download: {
        backgroundColor: '#FFFFFF',
        marginLeft: "auto",
        marginBottom: 10,
        "&:hover": {
            backgroundColor: "#FFF"
        }
    }
})


export default function Bar(props) {
  const { duration, curTime, onTimeUpdate,src } = props;

  const classes = useStyles()

  const curPercentage = (curTime / duration) * 100;

  function formatDuration(duration) {
    return moment
      .duration(duration, "seconds")
      .format("mm:ss", { trim: false });
  }

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".bar__progress");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = eMove => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  return (  
    <React.Fragment>
      <div
        className="bar__progress"
        style={{
          background: `linear-gradient(to right, orange ${curPercentage}%, white 0)`
        }}
        onMouseDown={e => handleTimeDrag(e)}
      >
        <span
          className="bar__progress__knob"
          style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
      <div className="bar">
        <span className="bar__time">{formatDuration(curTime)}</span>  &nbsp;&nbsp;&nbsp;     
        <span className="bar__time">{formatDuration(duration)}</span>
        <IconButton className={classes.download} href={src}>
          <GetAppIcon />
        </IconButton>
      </div>
    </React.Fragment>
      
  );
}
