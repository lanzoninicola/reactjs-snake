import React from 'react';
import classes from './Food.css'

const Food = (props) => {

    let style = {
        top: String(props.top) + "px",
        left: String(props.left) + "px",
    }


    return (
        <div id="Food"
            className={classes.Food}
            style={style}
        >
        </div>
    );
};


export default Food;