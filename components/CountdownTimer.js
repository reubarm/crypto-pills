import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',
  },
  label: {
    fontSize: '1.2rem',
    marginRight: '5px',
    color: 'black',
  },
  timer: {
    padding: '10px 15px',
    marginLeft: '5px',
    minWidth: '230px',
    color: '#F19100',
    backgroundColor: 'white',
    borderRadius: '20px',
    fontWeight: '600',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
}));

function CountdownTimer({endTime, ...props}) {
  const classes = useStyles();
  
  const [countdownRunning, setCountdownRunning] = React.useState(true);
  const [timeRemaining, setTimeRemaining] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      let diff = endTime - +new Date();
      if (diff < 0) {
        setCountdownRunning(false);
        return;
      }
      let countdown = {};
      countdown.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -=  countdown.days * (1000 * 60 * 60 * 24);

      countdown.hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= countdown.hours * (1000 * 60 * 60);

      countdown.minutes = Math.floor(diff / (1000 * 60));
      diff -= countdown.minutes * (1000 * 60);

      countdown.seconds = Math.floor(diff / (1000));
      diff -= countdown.seconds * (1000);

      setTimeRemaining(countdown);
    }, 1000);

    return () => clearInterval(interval);
  });
  
  return (countdownRunning ? 
    <div className={classes.root}>
      <Typography variant='body1' className={classes.label}>Sale begins in:</Typography>
      <Paper elevation={3} className={classes.timer}>
       {`${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`}
      </Paper>
    </div>
    : <></>
  )
};

export default CountdownTimer;