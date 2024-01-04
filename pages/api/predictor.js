import {generateFilledArrayBoard, printBoard, clamp, isValidPosition, clearFloodFilled} from "./helpers.js";
import { floodFill, setLastFloodFillCounter, getLastFloodFillCounter } from "./algorithms.js";

export class PredictorBoard {
    getBoard() {
        return this.boardArray;
    }

    constructor(gameState) {
        this.height = gameState.board.height;
        this.width = gameState.board.width;
        this.boardArray = generateFilledArrayBoard(this.height, this.width, '·');

        this.snakeMaxes = new Array(gameState.board.snakes.length);

        // console.log("JSON.stringify(gameState)");
        // console.log(JSON.stringify(gameState));
        // printBoard(this.boardArray);

        let indexer = 0;
        gameState.board.snakes.forEach((snake) => {
            this.snakeMaxes[indexer++] = snake.body.length;
            // console.log(String(snake.health));
            if (snake.health > 0) {
                this.populateSnake(snake, snake.body.length);
            }
            // console.log(snake.body.length);
        });
    }

    calculateFill(x, y){

        setLastFloodFillCounter(0);
        this.boardArray = floodFill(this.boardArray, x-1, y);
        const south = getLastFloodFillCounter();
        this.boardArray = clearFloodFilled(this.boardArray);

        setLastFloodFillCounter(0);
        this.boardArray = floodFill(this.boardArray, x+1, y);
        const east = getLastFloodFillCounter();
        this.boardArray = clearFloodFilled(this.boardArray);

        setLastFloodFillCounter(0);
        this.boardArray = floodFill(this.boardArray, x, y-1);
        const north = getLastFloodFillCounter();
        this.boardArray = clearFloodFilled(this.boardArray);

        setLastFloodFillCounter(0);
        this.boardArray = floodFill(this.boardArray, x, y+1);
        const west = getLastFloodFillCounter();
        this.boardArray = clearFloodFilled(this.boardArray);

        if(isValidPosition(this.boardArray, x-1, y)){
            this.boardArray[x-1][y].fill = 'W';
        }
        if(isValidPosition(this.boardArray, x+1, y)) {
            this.boardArray[x+1][y].fill = 'E';
        }
        if(isValidPosition(this.boardArray, x, y-1)) {
            this.boardArray[x][y-1].fill = 'S';
        }
        if(isValidPosition(this.boardArray, x, y+1)) {
            this.boardArray[x][y+1].fill = 'N';
        }

        // this.boardArray = floodFill(this.boardArray, x, y);
        // for (let i = 0; i < this.boardArray.length; i++) {
        //     for (let j = 0; j < this.boardArray[0].length; j++) {
        //         this.boardArray[i][j].fill = ((this.boardArray[i][j].floodFilled === false)? this.boardArray[i][j].fill : '░');
        //     }
        // }
        return [{count: east, direction: "right"},
            {count: north, direction: "down"},
            {count: south, direction: "left"},
            {count: west, direction: "up"}];
    }

    predictNextTurn(waveChar) {
        //   let printCacaculated = false;
        // if(waveChar.length != 0){
        //     printCacaculated = true;
        // }

        for (let i = 0; i < this.boardArray.length; i++) {
            for (let j = 0; j < this.boardArray[0].length; j++) {
                if (this.boardArray[i][j].fill === '·' || this.boardArray[i][j].fill === '░') {
                    // for (let k = -1; k <= 1; k++) {
                    //   for (let l = -1; l <= 1; l++) {

                    // TODO: Make this not use try in catching out of bounds
                    try {
                        if (this.boardArray[i - 1][j].future > 0) {
                            // this.boardArray[i][j].fill = waveChar;                            this.boardArray[i][j].fill = (this.boardArray[i][j][2]==="JavascriptStarterBasis1a" || true ? (this.boardArray[i - 1][j].future + 1) : waveChar);
                            this.boardArray[i][j].future = -(this.boardArray[i - 1][j].future + 1);
                            this.boardArray[i][j][2] = this.boardArray[i - 1][j][2];
                        }
                    } catch (e) {}
                    try {
                        if (this.boardArray[i + 1][j].future > 0) {
                            // this.boardArray[i][j].fill = waveChar;
                            this.boardArray[i][j].fill = (this.boardArray[i][j][2]==="JavascriptStarterBasis1a" || true ? (this.boardArray[i + 1][j].future + 1) : waveChar);
                            this.boardArray[i][j].future = -(this.boardArray[i + 1][j].future + 1);
                            this.boardArray[i][j][2] = this.boardArray[i + 1][j][2];
                        }
                    } catch (e) {}
                    try {
                        if (this.boardArray[i][j - 1].future > 0) {
                            // this.boardArray[i][j].fill = waveChar;
                            this.boardArray[i][j].fill = (this.boardArray[i][j][2]==="JavascriptStarterBasis1a" || true ? (this.boardArray[i][j - 1].future + 1) : waveChar);
                            this.boardArray[i][j].future = -(this.boardArray[i][j - 1].future + 1);
                            this.boardArray[i][j][2] = this.boardArray[i][j - 1][2];
                        }
                    } catch (e) {}
                    try {
                        if (this.boardArray[i][j + 1].future > 0) {
                            // this.boardArray[i][j].fill = waveChar;
                            this.boardArray[i][j].fill = (this.boardArray[i][j][2]==="JavascriptStarterBasis1a" || true ? (this.boardArray[i][j + 1].future + 1) : waveChar);
                            this.boardArray[i][j].future = -(this.boardArray[i][j + 1].future + 1);
                            this.boardArray[i][j][2] = this.boardArray[i][j + 1][2];
                        }
                    } catch (e) {}
                    // // TODO: Make this not use try in catching out of bounds
                }
            }
        }

        for (let i = 0; i < this.boardArray.length; i++) {
            for (let j = 0; j < this.boardArray[0].length; j++) {
                if (this.boardArray[i][j].future < 0) {
                    this.boardArray[i][j].future = -this.boardArray[i][j].future;
                }
            }
        }
    }

    placePoint(x, y, value, snakeMax) {
        this.boardArray[x][y].fill = value;
        this.boardArray[x][y].future = snakeMax;
    }

    populateSnake(snake, max) {
        this.placePoint(snake.body[0].x, snake.body[0].y, '0', 0);
        this.placePoint(snake.body[snake.body.length-1].x, snake.body[snake.body.length-1].y, '', 0);

        // TODO: Fix to work with ┌└┐┘─│ characters

        // for (let j = snake.body.length - 1; j >= 0; j--) {
        for (let j = 1; j < snake.body.length; j++) {
            const bodyPoint = snake.body[j];
            this.placePoint(bodyPoint.x, bodyPoint.y, snake.body.length - j - 1, 0);
        }
        // Head with maxer
        const bodyPoint = snake.body[0];
        this.placePoint(
            bodyPoint.x,
            bodyPoint.y,
            // snake.body.length - j - 1,
            (snake.name==="JavascriptStarterBasis1a"? max: '▒'),
            max,
        );
    }
}
