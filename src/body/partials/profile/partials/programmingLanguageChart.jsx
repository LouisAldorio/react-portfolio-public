import React,{useRef,useEffect,useState} from 'react';
import Chartjs from "chart.js";

export default function ProgrammingLanguageChart(props) {
  const chartContainer = useRef(null);

  const chartConfig = {
    type: "doughnut",
    data: {
      datasets: [{
          data: [props.data.value,(props.data.total - props.data.value)],
          backgroundColor: [
            props.data.color,
            "rgba(225, 225, 225, 1)"
          ],
      }],
      labels: [
          props.data.name,
      ],
    },
    options: {
      animation:{
        duration: 2200
      }
    }
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      new Chartjs(chartContainer.current, chartConfig);
    }
  }, []);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
}
