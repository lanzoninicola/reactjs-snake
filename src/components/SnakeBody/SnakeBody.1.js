import React from 'react';
import classes from './SnakeBody.css'

const SnakeBody = (props) => {

    console.log(props.type);

    let top = props.offsetTop;
    let left = props.offsetLeft;

    if (props.type === "body") {
        switch (props.nextMove) {
            case 1:
                top = top + (props.noOfSnakeBlock * 20)
                console.log("moveup ", top)
                break;
            case 2:
                top = top - (props.noOfSnakeBlock * 20)
                console.log("movedown ", top)
                break;
            case 3:
                left = left + (props.noOfSnakeBlock * 20)
                console.log("moveleft ", props.offsetLeft, props.noOfSnakeBlock, left)
                break;
            case 4:
                left = left - (props.noOfSnakeBlock * 20)
                console.log("moveright ", left)
                break;
            default:
                break;
        }
    }

    let style = {
        top: String(top) + "px",
        left: String(left) + "px",
    }

    console.log(props.nextMove, props.type, top, left);

    return (
        <div id={props.id}
            className={classes.SnakeBody}
            style={style}
        >{props.children}
        </div>
    );
};


export default SnakeBody;