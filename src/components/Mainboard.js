import React from "react";
import Pin from "./Pin";
import "./Mainboard.css";

function Mainboard({pins , ...props}) {

  return (
    <div className="mainboard">
      <div className="mainboard__container">
        {pins.map((pin , index) => {
          let { srcImage } = pin;
          return <Pin urls={srcImage} {...pin} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Mainboard;
