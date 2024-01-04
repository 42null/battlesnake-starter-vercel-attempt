export function generateFilledArrayBoard(width, height, fill) {
    let array = new Array(height);
    for (let i = 0; i < height; i++) {
        let row = new Array(width);
        for (let j = 0; j < width; j++) {
            row[j] = {
                fill: fill,
                future: 0, //Future path value
                name: false, //Snake name attribute
                floodFilled: false //FloodFill touched
            };
        }
        array[i] = row;
    }
    return array;
}

// Avoid checking every single time //TODO: MOVE OUT OF CHECKING EVERY TIME
export function isValidPosition(board, x, y){
    return x >= 0 && x < board.length && y >= 0 && y < board[0].length;
}

// export function printBoard(board) {
//   console.log("----------");
//   board.forEach(function (row) {
//     process.stdout.write("|");
//     row.forEach(function (point) {
//       process.stdout.write(String(point));
//     });
//     console.log("|");
//   });
//   console.log("----------\n");
// }

export function printBoard(board) {
    console.log(" 0123456789-");
    for (let coloum = board[0].length - 1; coloum >= 0; coloum--) {
        process.stdout.write("|");

        for (let row = 0; row < board.length; row++) {
            process.stdout.write(String(board[row][coloum].fill));
        }

        console.log("|");
    }

    console.log(" 0123456789-\n");
}

export function printPath(path) {
    process.stdout.write("Path: ");
    path.forEach((direction) => process.stdout.write(direction + '·'));
    console.log();
}

export function clamp(number, min, max) {
    return number <= min ? min : number >= max ? max : number;
}
