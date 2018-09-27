import React, { Component } from 'react';
import SnakeBody from '../../components/SnakeBody/SnakeBody';

class Snake extends Component {
    state = {
        gameAreaInfo: this.props.gameAreaInfo,
        snakeArray: []
    }

    componentDidMount() {
        this.setSnakePosition();
    }

    endGameListener() {
        let snake = [...this.state.snakeArray] || [];
        let snakeHead = snake[0];

        const { height, width } = this.state.gameAreaInfo.dimension;

        if (snake.length > 0 ) {
            if (snakeHead[0] === 0 || snakeHead[0] === height ||
                snakeHead[1] === 0 || snakeHead[1] === width) {
                this.props.stopGame();
            }
        }

    }

    grow(snakeState, snakeDirection) {

        let snakeArray = snakeState;
        let snakeLength = snakeArray.length;

        let lastSnakeBlock = snakeArray[snakeLength - 1];

        let xdir = lastSnakeBlock[0];
        let ydir = lastSnakeBlock[1];

        switch (snakeDirection) {
            case "ArrowUp":
                xdir -= 20;
                break;
            case "ArrowDown":
                xdir += 20;
                break;
            case "ArrowLeft":
                ydir -= 20;
                break;
            case "ArrowRight":
                ydir += 20;
                break;
            default:
                break;
        }

        snakeArray.push([xdir, ydir])

        this.setState({
            snakeArray: snakeArray
        });

    }

    foodCatchHandler(snakeState, snakeDirection) {
        let snakeHead = snakeState[0];
        let foodPosition = this.props.foodPosition || [0, 0];

        if (snakeHead[0] === foodPosition[0] &&
            snakeHead[1] === foodPosition[1]) {
            this.grow(snakeState, snakeDirection)

            this.props.setFoodPosition();
        }

        return false;
    }

    moveSnake(direction) {
        let snake = [...this.state.snakeArray];
        let snakeLenght = snake.length;
        let snakeDirection = direction;

        let newSnake = [];

        for (let i = 0; i < snakeLenght; i++) {

            let xdir;
            let ydir;

            if (i === 0) {
                xdir = snake[i][0];
                ydir = snake[i][1];

                switch (direction) {
                    case "ArrowUp":
                        xdir -= 20;
                        break;
                    case "ArrowDown":
                        xdir += 20;
                        break;
                    case "ArrowLeft":
                        ydir -= 20;
                        break;
                    case "ArrowRight":
                        ydir += 20;
                        break;
                    default:
                        break;
                }

            } else {
                xdir = snake[i - 1][0];
                ydir = snake[i - 1][1];
            }

            newSnake.push([xdir, ydir])
        }

        this.setState({
            snakeArray: newSnake
        },
            () => this.foodCatchHandler(this.state.snakeArray, snakeDirection)
        );

        this.endGameListener();
    }

    onKeyPressHandler = (event) => {

        let keycode = (event) ? event.key : null;

        if (keycode === "ArrowUp" ||
            keycode === "ArrowDown" ||
            keycode === "ArrowLeft" ||
            keycode === "ArrowRight") {
            this.moveSnake(keycode);
        }
    }

    getGridComposition() {
        const {width, height} = this.state.gameAreaInfo.dimension;

        let x = width / 20;
        let y = height / 20;

        let grid = [x, y]

        return grid;

    }

    setSnakePosition() {
        let snake = [...this.state.snakeArray];
        let grid = this.getGridComposition();

        let x = Math.floor(Math.random() * (grid[0] - 1) + 1) * 20;
        let y = Math.floor(Math.random() * (grid[1] - 1) + 1) * 20;

        let snakeHead = [x, y]

        snake.push(snakeHead);

        this.setState({ snakeArray: snake });

        
    }

    render() {

        let snakeArray = [...this.state.snakeArray];

        let snakeBody = snakeArray.map(
            (body, i) => {
                let x = body[0];
                let y = body[1];

                return <SnakeBody key={i} index={i} top={x} left={y} />
            }

        )

        const {height, width} = this.state.gameAreaInfo.dimension;

        let style = {
            height: height,
            width: width,
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