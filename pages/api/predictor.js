import { generateFilledArrayBoard, printBoard, clamp } from "./helpers.js";
import { floodFill } from "./algorithms.js";

export class PredictorBoard {
    getBoard() {
        return this.boardArray;
    }

    constructor(gameState) {
        this.height = gameState.board.height;
        this.width = gameState.board.width;
        this.boardArray = generateFilledArrayBoard(this.height, this.width, '·');

        // TODO: Having different arrays that must be in sync is bad code and a bad practice, will move over after MVP
        // this.snakeIndexes = new Array(gameState.board.snakes.length);
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

    showFill(x, y){
        this.boardArray[x][y].fill = '·';
        this.boardArray = floodFill(this.boardArray, x, y);
        // for (let i = 0; i < this.boardArray.length; i++) {
        //     for (let j = 0; j < this.boardArray[0].length; j++) {
        //         this.boardArray[i][j].fill = ((this.boardArray[i][j].floodFilled === false)? this.boardArray[i][j].fill : '░');
        //     }
        // }
    }

    predictNextTurn(waveChar) {
        //   let printCacaculated = false;
        // if(waveChar.length != 0){
        //     printCacaculated = true;
        // }

        for (let i = 0; i < this.boardArray.length; i++) {
            for (let j = 0; j < this.boardArray[0].length; j++) {
                if (this.boardArray[i][j].fill === '·') {
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
