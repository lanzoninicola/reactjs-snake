import React, { Component, Fragment } from 'react';
import classes from './GameArea.css'
import Food from '../../components/Food/Food';
import Snake from '../Snake/Snake';
import BottomBar from '../../components/BottomBar/BottomBar';


class GameArea extends Component {
    state = {
        gameStatus: "idle",
        foodPosition: [0, 0],
    }

    componentDidMount() {
        this.getGameAreaInfo();
    }

    getGameAreaInfo = () => {
        let gameAreaDivElement = document.getElementById("gameArea");

        let gameAreaInfo = {};

        gameAreaInfo = {
            dimension: {
                height: gameAreaDivElement.offsetHeight,
                width: gameAreaDivElement.offsetWidth,
            },
            location: {
                top: gameAreaDivElement.offsetTop,
                left: gameAreaDivElement.offsetLeft
            }
        }
        this.setState(
            {
                ...this.state,
                gameAreaInfo: gameAreaInfo
            }
        )
    }

    startGame = () => {
        this.setState({ gameStatus: "started" },
            () => this.setFoodPosition()
        )
    }

    pauseGame = () => {
        this.setState({ gameStatus: "paused" })
    }

    resumeGame = () => {
        this.setState({ gameStatus: "started" })
    }

    stopGame = () => {
        this.setState({ gameStatus: "stopped" })
    }

    setFoodPosition = () => {
        let xGrid = this.state.gameAreaWidth / 20;
        let yGrid = this.state.gameAreaHeight / 20;

        let x = Math.floor(Math.random() * (xGrid - 1) + 1) * 20;
        let y = Math.floor(Math.random() * (yGrid - 1) + 1) * 20;

        let newFoodPosition = [x, y]

        this.setState({ foodPosition: newFoodPosition });

    }

    render() {

        console.log(this.state.gameStatus);
        const { gameStatus, gameAreaInfo, foodPosition } = this.state;

        return (
            <div className={classes.Container}>

                <div id="gameArea" className={classes.GameArea}>

                    {(gameStatus === "started" || gameStatus === "paused") ?
                        <Fragment>
                            <Food
                                top={foodPosition[0]}
                                left={foodPosition[1]} />
                            <Snake
                                gameAreaInfo={gameAreaInfo}
                                foodPosition={foodPosition}
                                setFoodPosition={this.setFoodPosition}
                                stopGame={this.stopGame}
                            />
                        </Fragment>
                        :
                        null
                    }
                </div>
                <BottomBar
                    gameStatus={gameStatus}
                    btnActionStart={this.startGame}
                    btnActionPause={this.pauseGame}
                    btnActionResume={this.resumeGame}
                />
            </div>

        );
    }
}

export default GameArea;