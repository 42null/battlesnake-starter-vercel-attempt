export function generateFilledArrayBoard(width, height, fill) {
    let array = new Array(height);
    for (let i = 0; i < height; i++) {
        let row = new Array(width);
        for (let j = 0; j < width; j++) {
            row[j] = new Array(3);
            row[j][0] = fill;
            row[j][1] = 0; //Future path value
            row[j][2] = false; //Snake name attributed
        }
        array[i] = row;
    }
    return array;
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
            process.stdout.write(String(board[row][coloum][0]));
        }

        console.log("|");
    }

    console.log(" 0123456789-\n");
}

export function printPath(path) {
    path.forEach((direction) => process.stdout.write(direction + " "));
    console.log();
}

export function clamp(number, min, max) {
    return number <= min ? min : number >= max ? max : number;
}
