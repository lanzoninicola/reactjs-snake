import React, { Component } from 'react';
import SnakeBody from '../../components/SnakeBody/SnakeBody';

class Snake extends Component {
    state = {
        gameAreaHeight: this.props.gameAreaHeight,
        gameAreaWidth: this.props.gameAreaWidth,
        //snakeArray: [[100, 100]]
        snakeArray: [[100, 100], [80, 100], [60, 100],[40, 100], [20, 100]]
    }

    grow() {
        let snakeArray = [...snakeArray];
        let arrayLength = snakeArray.length;

        let lastSnakeBlock = snakeArray[arrayLength];
        


    }

    isFoodCatched() {
        let snakeHead = this.state.snakeArray[0];
        let lastFoodPosition = this.props.lastFoodPosition || [0,0];

        if(snakeHead[0] === lastFoodPosition[0] &&
            snakeHead[1] === lastFoodPosition[1]) {
            return true;
        }

        return false;
    }

    moveUp() {
        let snake = [...this.state.snakeArray];
        let snakeLenght = snake.length;

        let newSnake = [];

        for (let i = 0; i < snakeLenght; i++) {

            let xdir;
            let ydir;

            if (i === 0) {
                xdir = snake[i][0];
                ydir = snake[i][1];
    
                xdir -= 20;
            } else {
                xdir = snake[i-1][0];
                ydir = snake[i-1][1];
            }
            
            newSnake.push([xdir, ydir])
        }

        this.setState({ snakeArray: newSnake });

        if (this.isFoodCatched()) {
            this.grow()
        } 

    }

    moveDown() {
        let snake = [...this.state.snakeArray];
        let snakeLenght = snake.length;

        let newSnake = [];

        for (let i = 0; i < snakeLenght; i++) {

            let xdir;
            let ydir;

            if (i === 0) {
                xdir = snake[i][0];
                ydir = snake[i][1];
    
                xdir += 20;
            } else {
                xdir = snake[i-1][0];
                ydir = snake[i-1][1];
            }
            
            newSnake.push([xdir, ydir])
        }

        this.setState({ snakeArray: newSnake });

        if (this.isFoodCatched()) {
            this.grow()
        }

    }

    moveLeft() {
        let snake = [...this.state.snakeArray];
        let snakeLenght = snake.length;

        let newSnake = [];

        for (let i = 0; i < snakeLenght; i++) {

            let xdir;
            let ydir;

            if (i === 0) {
                xdir = snake[i][0];
                ydir = snake[i][1];
    
                ydir -= 20;
            } else {
                xdir = snake[i-1][0];
                ydir = snake[i-1][1];
            }
            
            newSnake.push([xdir, ydir])
        }

        this.setState({ snakeArray: newSnake });

        if (this.isFoodCatched()) {
            this.grow()
        }
    }

    moveRight() {
        let snake = [...this.state.snakeArray];
        let snakeLenght = snake.length;

        let newSnake = [];

        for (let i = 0; i < snakeLenght; i++) {

            let xdir;
            let ydir;

            if (i === 0) {
                xdir = snake[i][0];
                ydir = snake[i][1];
    
                ydir += 20;
            } else {
                xdir = snake[i-1][0];
                ydir = snake[i-1][1];
            }
            
            newSnake.push([xdir, ydir])
        }

        this.setState({ 
            snakeArray: newSnake
        });

        if (this.isFoodCatched()) {
            this.grow()
        }

    }

    onKeyPressHandler = (event) => {

        let keycode = (event) ? event.key : null;

        switch (keycode) {
            case "ArrowUp":
                this.moveUp()
                break;
            case "ArrowDown":
                this.moveDown()
                break;
            case "ArrowLeft":
                this.moveLeft()
                break;
            case "ArrowRight":
                this.moveRight()
                break;
            default:
                break;
        }

    }

    render() {

        let snakeArray = this.state.snakeArray;

        let snakeBody = snakeArray.map(
            (body, i) => {
                let x = body[0];
                let y = body[1];

                return <SnakeBody key={i} top={x} left={y} />
            }

        )

        let style = {
            height: this.state.gameAreaHeight,
            width: this.state.gameAreaWidth,
        }

        return (
            <div
                style={style}
                tabIndex="0"
                onKeyDown={this.onKeyPressHandler}
            >
                {snakeBody}
            </div>
        );
    }
}

export default Snake;
