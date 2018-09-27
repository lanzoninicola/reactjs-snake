import React, { Component } from 'react';
import SnakeBody from '../../components/SnakeBody/SnakeBody';
import classes from './Snake.css'

class Snake extends Component {
    state = {
        snakeStyle: {
            lastOffsetTop: 0,
            lastOffsetLeft: 0
        },
        snakeBody: [],
        snakeBodyBlocks: 0,
        nextMove: 0, // 1 up, 2 down, 3 left, 4 right
        foodCatched: false,
        noOfFoodCatched: 0
    }

    componentDidMount() {
        //console.log("componentDidMount-snake");
        const { gameAreaHeight, gameAreaWidth } = this.props;

        this.setSnakeStartPosition(
            gameAreaHeight,
            gameAreaWidth,
        )
    }

    componentDidUpdate() {
        //console.log("componentDidUpdate-snake");
    }

    increaseSnakeBody = () => {

        let snakeBody = [...this.state.snakeBody];

        snakeBody.push(1);

        this.setState({ snakeBody: snakeBody });

    }

    foodCatched = () => {

        if (this.state.snakeStyle.lastOffsetTop === this.props.lastFoodOffsetTop
            && this.state.snakeStyle.lastOffsetLeft === this.props.lastFoodOffsetLeft) {

            ////console.log(this.state.foodCatched);

            this.setState({
                foodCatched: true,
                noOfFoodCatched: this.state.noOfFoodCatched + 1
            })

            this.increaseSnakeBody();
        }

    }


    moveUp = () => {
        let snakeDivElement = this.getSnakeHeadElement();
        let topPosition = snakeDivElement.offsetTop - 20;
        //snakeDivElement.style.top = topPosition;

        let snakeStyle = { ...this.state.snakeStyle };
        snakeStyle.lastOffsetTop = topPosition;

        this.setState({ snakeStyle: snakeStyle, nextMove: 1 });

        this.foodCatched();
    }

    moveDown = () => {
        let snakeDivElement = this.getSnakeHeadElement();
        let bottomPosition = snakeDivElement.offsetTop + 20;
        //snakeDivElement.style.top = bottomPosition;

        let snakeStyle = { ...this.state.snakeStyle };
        snakeStyle.lastOffsetTop = bottomPosition;

        this.setState({ snakeStyle: snakeStyle, nextMove: 2 });

        this.foodCatched();
    }

    moveLeft = () => {
        let snakeDivElement = this.getSnakeHeadElement();
        let leftPosition = snakeDivElement.offsetLeft - 20;
        //snakeDivElement.style.left = leftPosition;


        let snakeStyle = { ...this.state.snakeStyle };
        snakeStyle.lastOffsetLeft = leftPosition;

        this.setState({ snakeStyle: snakeStyle, nextMove: 3 });

        this.foodCatched();
        console.log(this.state.foodCatched);
    }

    moveRight = () => {
        let snakeDivElement = this.getSnakeHeadElement();
        let rightPosition = snakeDivElement.offsetLeft + 20;
        //snakeDivElement.style.left = rightPosition;


        let snakeStyle = { ...this.state.snakeStyle };
        snakeStyle.lastOffsetLeft = rightPosition;

        this.setState({ snakeStyle: snakeStyle, nextMove: 4 });

        this.foodCatched();
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


    setSnakeStartPosition = (gameAreaHeight, gameAreaWidth) => {
        let snakeDivElement = this.getSnakeHeadElement();

        let xGrid = gameAreaWidth / snakeDivElement.offsetWidth;
        let yGrid = gameAreaHeight / snakeDivElement.offsetHeight;

        let x = Math.floor(Math.random() * (xGrid - 1) + 1) * snakeDivElement.offsetWidth;
        let y = Math.floor(Math.random() * (yGrid - 1) + 1) * snakeDivElement.offsetHeight;

        let topPosition = x;
        let leftPosition = y;

        //snakeDivElement.style.top = topPosition;
        //snakeDivElement.style.left = leftPosition;

        let snakeStyle = { ...this.state.snakeStyle };
        snakeStyle.lastOffsetTop = topPosition;
        snakeStyle.lastOffsetLeft = leftPosition;

        this.setState({ snakeStyle: snakeStyle });

    }

    getSnakeHeadElement = () => {
        return document.getElementById("snake-head");
    }



    render() {

        console.log(this.state.nextMove, this.state.snakeStyle.lastOffsetTop, this.state.snakeStyle.lastOffsetLeft);

        let snakeBody = this.state.snakeBody;

        let snakeElements = snakeBody.map((block, i) => {
            return <SnakeBody
                key={i}
                noOfSnakeBlock={i}
                id={"snake-body-" + i}
                type={"body"}
                offsetTop={this.state.snakeStyle.lastOffsetTop}
                offsetLeft={this.state.snakeStyle.lastOffsetLeft}
                nextMove={this.state.nextMove}
            >i
            </SnakeBody>
        })

        /*
        for (let index = 0; index < snakeBodyBlocks; index++) {

            snakeBody.push(
                <SnakeBody
                    key={index}
                    noOfSnakeBlock={index}
                    id={"snake-body-" + index}
                    type={"body"}
                    offsetTop={this.state.snakeStyle.lastOffsetTop}
                    offsetLeft={this.state.snakeStyle.lastOffsetLeft}
                    nextMove={this.state.nextMove}
                />
            )

        }
        console.log(snakeBody);
        */
        return (
            <div
                className={classes.Snake}
                tabIndex="0"
                onKeyDown={this.onKeyPressHandler}
            >
                <SnakeBody
                    key={this.state.snakeBodyBlocks}
                    noOfSnakeBlock={this.state.snakeBodyBlocks}
                    id={"snake-head"}
                    type={"head"}
                    offsetTop={this.state.snakeStyle.lastOffsetTop}
                    offsetLeft={this.state.snakeStyle.lastOffsetLeft}
                    nextMove={this.state.nextMove}
                />
                {snakeElements}

            </div>
        );
    }
}

export default Snake;

//https://codepen.io/lafisrap/pen/OmyBYG || PlayerClass
                // http://patorjk.com/games/snake/
                // https://reactarmory.com/guides/react-events-cheatsheet
