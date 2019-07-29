import React, { useState, useEffect } from "react";
import './App.css';
import { number } from "prop-types";

const acid = (rad:number) =>{
  let r=Math.round(170+80*Math.sin(rad*1));
  let g=Math.round(170+80*Math.sin(rad*1.5));
  let b=Math.round(170+80*Math.sin(rad*1.8));
  return "rgb("+r+","+g+","+b+")";
}

export const Banner: React.FC = () => {
  const [time, updateTime] = useState<number>(0); // time : milliseconds
  useEffect(() => {
    console.log("start timer");
    const id = setInterval(() => {
      updateTime(t => t + 50);
    }, 50);
    return () => {
      clearInterval(id);
    };
  });

  let rotation_speed=0.0013;
  let spring_speed=0.001;
  let distance_max=0.1;
  let layers=20;
  let distance=(1+Math.sin(Number(time)*spring_speed))*distance_max+0.1;
  let vec_x=Math.sin(Number(time)*rotation_speed)*10;
  let vec_y=Math.cos(Number(time)*rotation_speed)*10;
  return (
    <div className="App">
      <header className="App-header" style={{height:"1000px"}}>
        {Array.from(Array(layers).keys()).map(layer=>{
          return  <span style={{  top:vec_y*layer*distance,
                                  left:vec_x*layer*distance,
                                  position:"relative",
                                  height:"0",
                                  fontSize:"300px",
                                  fontWeight:"bold",
                                  color:acid(0.002*time+layer*0.1)}}>
                  草
                  </span>
        })}
      </header>
    </div>
  );
}