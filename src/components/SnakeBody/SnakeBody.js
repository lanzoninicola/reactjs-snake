import React from 'react';
import classes from './SnakeBody.css'

const SnakeBody = (props) => {

    let style = {
        top: String(props.top) + "px",
        left: String(props.left) + "px",
    }


    return (
        <div id={props.id}
            className={classes.SnakeBody}
            style={style}
        >
        
        </div>
    );
};


export default SnakeBody;