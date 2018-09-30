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
  const { classes, gameStatus, btnSetAction } = props;

  const setButtonLabel = (btnAction) => {
    if (btnAction === "start") return "Start Game"
    if (btnAction === "pause") return "Pause"
    return null
  }
    
  const setButtonDisable = (btnAction) => {
    if (gameStatus === "started" && btnAction === "start") return true
    if (gameStatus === "idle" && btnAction === "pause") return true
    return false
  }

    return (
        <div>
            <Button variant="contained" color="primary" className={classes.button} disabled={setButtonDisable("start")} onClick={btnSetAction.start}>{setButtonLabel("start")}</Button>
            <Button variant="contained" color="primary" className={classes.button} disabled={setButtonDisable("pause")} onClick={btnSetAction.pause}>{setButtonLabel("pause")}</Button>
        </div>
    );
};


BottomBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomBar);

