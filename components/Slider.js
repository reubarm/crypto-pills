import React, { useState, useEffect, useRef } from "react";

import useStyles from "../themes/useStyles";

const TOTAL_SLIDES = 3; // n-1 in Array

const Slider = () => {
  const classes = useStyles();

  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  const desired = (e) => {
    setCurrent(Number(e.target.id));
  };

  useEffect(() => {
    ref.current.style.transition = "all 0.2s ease-in-out";
    ref.current.style.transform = `translateX(-${current}00%)`;
  }, [current]);

  let timer;

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => setCurrent(current + 1), 4000);
  }, [current]);

  // if(current = 4) setCurrent(0);

  return (
    <div className={classes.wrapper}>
      {/* <p>{current}</p> */}
      <div className={classes.frame}>
        <div className={classes.boxcontainer} ref={ref}>
          <div
            className={classes.box}
            style={{ backgroundImage: 'url("/background.png")' }}
          ></div>
          <div
            className={classes.box}
            style={{ backgroundImage: 'url("/bg1.jpeg")' }}
          ></div>
          <div
            className={classes.box}
            style={{ backgroundImage: 'url("/bg2.jpeg")' }}
          ></div>
          <div className={classes.box}> ❤️</div>
        </div>
      </div>
      {/* <div className={classes.button2container}>
        <div className={classes.button} onClick={prev}>Left</div>
        <div className={classes.button} onClick={next}>Right</div>
      </div> */}
      <div className={classes.button2container}>
        {[0, 1, 2, 3].map((num) => (
          
          <div
            className={`${classes.button2} ${
              num === current && `${classes.active}`
            }`}
            onClick={desired}
            id={num}
            key={num}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
