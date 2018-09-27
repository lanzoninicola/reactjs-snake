import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


const BottomBar = (props) => {
  const { classes, gameStatus, btnActionStart, btnActionPause, btnActionResume } = props;

  let startBtnLabel="Start Game";
  let pauseResumeBtnLabel="Pause"
  let btnEnableDisabled = false
  let btnActionPauseResume = btnActionPause;

  if (gameStatus === "started" || gameStatus ==="paused"){
    btnEnableDisabled=true
  }
  
  if (gameStatus === "paused"){
    pauseResumeBtnLabel="Resume";
    btnActionPauseResume=btnActionResume;
  }

    return (
        <div>
            <Button variant="contained" color="primary" className={classes.button} disabled={btnEnableDisabled} onClick={btnActionStart}>{startBtnLabel}</Button>
            <Button variant="contained" color="primary" className={classes.button} onClick={btnActionPauseResume}>{pauseResumeBtnLabel}</Button>
        </div>
    );
};


BottomBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomBar);

