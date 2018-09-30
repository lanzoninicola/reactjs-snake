import React, { Component, Fragment } from 'react';
import classes from './GameArea.css'
import Food from '../../components/Food/Food';
import Snake from '../Snake/Snake';
import BottomBar from '../../components/BottomBar/BottomBar';
import SimpleModalWrapped from '../../components/UI/Modal/Modal';


class GameArea extends Component {
    state = {
        gameStatus: "idle",
        showModal: false,
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
        this.setState({ gameStatus: "paused", showModal: true })
    }

    resumeGame = () => {
        this.setState({ gameStatus: "started", showModal: false })
    }

    stopGame = () => {
        this.setState({ gameStatus: "stopped" })
    }

    getGridComposition() {
        const { width, height } = this.state.gameAreaInfo.dimension;

        let x = width / 20;
        let y = height / 20;

        let grid = [x, y]

        return grid;

    }
    setFoodPosition = () => {
        let grid = this.getGridComposition();

        let x = Math.floor(Math.random() * (grid[0] - 1) + 1) * 20;
        let y = Math.floor(Math.random() * (grid[1] - 1) + 1) * 20;

        let newFoodPosition = [x, y]

        this.setState({ foodPosition: newFoodPosition });

    }

    render() {

        let { gameStatus, gameAreaInfo, foodPosition, showModal } = this.state;

        const btnSetAction = {
            start: this.startGame,
            pause: this.pauseGame,
            resume: this.resumeGame
        }


        console.log(gameStatus, showModal);

        return (
            <div className={classes.Container}>
                    {(gameStatus === "paused" && showModal === true) ?
                        <SimpleModalWrapped 
                            showModal={showModal}
                            resumeGame={this.resumeGame}
                        /> : null
                    }
                    <Fragment>
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
                            btnSetAction={btnSetAction}
                        />
                    </Fragment>
                
            </div>

        );
    }
}

export default GameArea;