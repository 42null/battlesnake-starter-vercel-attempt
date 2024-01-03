//FLOOD FILL
import {P} from "./treeSearch";
import { isValidPosition } from "./helpers.js";

function floodFill(board, startingX, startingY) {
    return spanFill(board, startingX, startingY);
}
//Span filling: Based off of pseudocode from https://en.wikipedia.org/wiki/Flood_fill

function spanFill(board, x, y){
    if (!inside(board, x, y) || board[x][y].isWall || board[x][y].isFilled) {
        return;
    }

    let stack = [];
    stack.push([x, x, y, 1]);
    stack.push([x, x, y - 1, -1]);

    while (stack.length > 0) {
        let [x1, x2, y, dy] = stack.pop();
        let x = x1;

        if (inside(board, x, y)) {
            while (inside(x - 1, y)) {
                board[x - 1][y].floodFill = true;
                x = x - 1;
            }

            if (x < x1) {
                stack.push([x, x1 - 1, y - dy, -dy]);
            }
        }

        while (x1 <= x2) {
            while (inside(board, x1, y)) {
                board[x1][y].floodFill = true;
                x1 = x1 + 1;
            }

            if (x1 > x) {
                stack.push([x, x1 - 1, y + dy, dy]);
            }

            if (x1 - 1 > x2) {
                stack.push([x2 + 1, x1 - 1, y - dy, -dy]);
            }

            x1 = x1 + 1;

            while (x1 < x2 && !inside(board, x1, y)) {
                x1 = x1 + 1;
            }

            x = x1;
        }
    }
}

function inside(board, x, y){
    return isValidPosition(board, x, y);
}
