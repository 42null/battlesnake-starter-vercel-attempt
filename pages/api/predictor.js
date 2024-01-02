import { generateFilledArrayBoard, printBoard, clamp } from "./helpers.js";

export class PredictorBoard {
    getBoard() {
        return this.boardArray;
    }

    constructor(gameState) {
        this.height = gameState.board.height;
        this.width = gameState.board.width;
        this.boardArray = generateFilledArrayBoard(this.height, this.width, " ");

        // TODO: Having diffrent arrays that must be in sync is bad code and a bad pratice, will move over after MVP
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

    predictNextTurn(waveChar) {
        //   let printCacaculated = false;
        // if(waveChar.length != 0){
        //     printCacaculated = true;
        // }

        for (let i = 0; i < this.boardArray.length; i++) {
            for (let j = 0; j < this.boardArray[0].length; j++) {
                if (this.boardArray[i][j][0] === " ") {
                    // for (let k = -1; k <= 1; k++) {
                    //   for (let l = -1; l <= 1; l++) {

                    // TODO: Make this not use try in catching out of bounds
                    try {
                        if (this.boardArray[i - 1][j][1] > 0) {
                            // this.boardArray[i][j][0] = waveChar;
                            this.boardArray[i][j][0] = (this.boardArray[i][j][2]==="JavascriptStarterBasis1a" || true ? (this.boardArray[i - 1][j][1] + 1) : waveChar);
                            this.boardArray[i][j][1] = -(this.boardArray[i - 1][j][1] + 1);
                            this.boardArray[i][j][2] = this.boardArray[i - 1][j][2];
                        }
                    } catch (e) {}
                    try {
                        if (this.boardArray[i + 1][j][1] > 0) {
                            // this.boardArray[i][j][0] = waveChar;
                            this.boardArray[i][j][0] = (this.boardArray[i][j][0]==="JavascriptStarterBasis1a" || true ? (this.boardArray[i + 1][j][1] + 1) : waveChar);
                            this.boardArray[i][j][1] = -(this.boardArray[i + 1][j][1] + 1);
                            this.boardArray[i][j][2] = this.boardArray[i + 1][j][2];
                        }
                    } catch (e) {}
                    try {
                        if (this.boardArray[i][j - 1][1] > 0) {
                            // this.boardArray[i][j][0] = waveChar;
                            this.boardArray[i][j][0] = (this.boardArray[i][j][0]==="JavascriptStarterBasis1a" || true ? (this.boardArray[i][j - 1][1] + 1) : waveChar);
                            this.boardArray[i][j][1] = -(this.boardArray[i][j - 1][1] + 1);
                            this.boardArray[i][j][2] = this.boardArray[i][j - 1][2];
                        }
                    } catch (e) {}
                    try {
                        if (this.boardArray[i][j + 1][1] > 0) {
                            // this.boardArray[i][j][0] = waveChar;
                            this.boardArray[i][j][0] = (this.boardArray[i][j][0]==="JavascriptStarterBasis1a" || true ? (this.boardArray[i][j + 1][1] + 1) : waveChar);
                            this.boardArray[i][j][1] = -(this.boardArray[i][j + 1][1] + 1);
                            this.boardArray[i][j][2] = this.boardArray[i][j + 1][2];
                        }
                    } catch (e) {}
                    // // TODO: Make this not use try in catching out of bounds
                    // try {
                    //   if (this.boardArray[i + k][j + l][1] > 0) {
                    //     this.boardArray[i][j][0] = "A";
                    //     this.boardArray[i][j][1] = -(
                    //       this.boardArray[i + k][j + l][1] + 1
                    //     );
                    //   }
                    // } catch (e) {}
                }
                // if(i > 1 && 0this.boardArray[i][j][0]){

                // }
                // this.boardArray[i][j][0] = "A";
            }
        }

        for (let i = 0; i < this.boardArray.length; i++) {
            for (let j = 0; j < this.boardArray[0].length; j++) {
                if (this.boardArray[i][j][1] < 0) {
                    this.boardArray[i][j][1] = -this.boardArray[i][j][1];
                }
            }
        }
    }

    placePoint(x, y, value, snakeMax) {
        this.boardArray[x][y][0] = value;
        this.boardArray[x][y][1] = snakeMax;
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
            (snake.name==="JavascriptStarterBasis1a"? max: "▯"),
            max,
        );
    }
}
