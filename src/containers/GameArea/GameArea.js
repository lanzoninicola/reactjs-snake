import React, { Component, Fragment } from 'react';
import classes from './GameArea.css'
import Food from '../../components/Food/Food';
import Snake from '../Snake/Snake';
import BottomBar from '../../components/BottomBar/BottomBar';
import SimpleModalWrapped from '../../components/UI/Modal/Modal';


class GameArea extends Component {
    state = {
        gameStatus: "idle",
        foodPosition: [0, 0],
        modal: {
            show: false,
            title: "",
            subTitle: "",
            btnLabel: ""
        },
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
        this.setState({ 
            gameStatus: "paused", 
            modal: {
                show: true,
                title: "Game Paused",
                subTitle: "What are you waiting for... Resume the game and enjoy!",
                btnLabel: "Resume"
            }
        })
    }

    resumeGame = () => {
        this.setState({ gameStatus: "started", show: false })
    }

    stopGame = () => {
        this.setState({ 
            gameStatus: "stopped", 
            modal: {
                show: true,
                title: "You are died",
                subTitle: "Do not be frustated! Try again...",
                btnLabel: "Resume"
            }
        })
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

        let { gameStatus, gameAreaInfo, foodPosition, modal } = this.state;

        const btnSetAction = {
            start: this.startGame,
            pause: this.pauseGame,
            resume: this.resumeGame
        }


        return (
            <div className={classes.Container}>
                    {(gameStatus === "paused" && modal.show === true) ?
                        <SimpleModalWrapped 
                            resumeGame={this.resumeGame}
                            show={modal.show}
                            title={modal.title}
                            subTitle={modal.subTitle}
                            btnLabel={modal.btnLabel}
                            gameStatus={this.state.gameStatus}
                        /> : null
                    }
                    {(gameStatus === "stopped" && modal.show === true) ?
                        <SimpleModalWrapped 
                            resumeGame={this.startGame}
                            show={modal.show}
                            title={modal.title}
                            subTitle={modal.subTitle}
                            btnLabel={modal.btnLabel}
                            gameStatus={this.state.gameStatus}
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