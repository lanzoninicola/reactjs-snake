import React, { Component } from 'react';
import classes from './Food.css'


class Food extends Component {
    state = {}

    componentDidMount() {
        //console.log("componentDidMount-foodComponent")

        this.setFoodPosition(
            this.props.gameAreaHeight,
            this.props.gameAreaWidth
        );

    }

    setFoodPosition = (gameAreaHeight, gameAreaWidth) => {
        let foodDivElement = document.getElementById("food");

        foodDivElement.style.position = "absolute";

        let xGrid = gameAreaWidth / foodDivElement.offsetWidth;
        let yGrid = gameAreaHeight / foodDivElement.offsetHeight;

        let x = Math.floor(Math.random() * (xGrid - 1) + 1) * foodDivElement.offsetWidth;
        let y = Math.floor(Math.random() * (yGrid - 1) + 1) * foodDivElement.offsetHeight;

        let topPosition = String(x) + "px";
        let leftPosition = String(y) + "px";

        this.props.setFoodPosition(x, y);

        foodDivElement.style.top = topPosition;
        foodDivElement.style.left = leftPosition;
        
    }


    componentDidUpdate(prevProps) {
        //console.log("componentDidUpdate-foodComponent")
        //https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html            
        /*  
        if (this.props.gameAreaHeight !== prevProps.gameAreaHeight ||
                this.props.gameAreaWidth !== prevProps.gameAreaWidth
                ) {
                    this.getGameAreaPosition();
                }
    
            this.setFoodPosition(
                this.state.gameAreaHeight,
                this.state.gameAreaWidth
            );
        */

    }

    render() {
        return (
            <div id="food" className={classes.Food}>
            </div>
        );
    }
}

export default Food;