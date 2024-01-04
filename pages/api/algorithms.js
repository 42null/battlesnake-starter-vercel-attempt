//FLOOD FILL
import {P} from "./treeSearch";
import { isValidPosition } from "./helpers.js";
import {patchConsoleError} from "next/dist/client/components/react-dev-overlay/internal/helpers/hydration-error-info";

export function floodFill(board, x, y)
{
    if(!isValidPosition(board, x, y) || board[x][y].fill !== '·'){
        return board;
    } else {
        board[x][y].fill = '░';
        board = floodFillA(board, x + 1, y);
        board = floodFillA(board, x - 1, y);
        board = floodFillA(board, x, y + 1);
        board = floodFillA(board, x, y - 1);

        return board;
    }
}

// function floodFillA(board, x, y){




    // // if (!inside(board, x, y) || board[x][y].floodFilled || !board[x][y].name) {
    // //     return;
    // // }
    //
    // let stack = [];
    // stack.push([x, x, y, 1]);
    // stack.push([x, x, y - 1, -1]);
    //
    // while (stack.length > 0) {
    //     let [x1, x2, y, dy] = stack.pop();
    //     let x = x1;
    //
    //     if (inside(board, x, y)) {
    //         while (inside(x - 1, y)) {
    //             board[x - 1][y].floodFilled = true;
    //             x = x - 1;
    //         }
    //
    //         if (x < x1) {
    //             stack.push([x, x1 - 1, y - dy, -dy]);
    //         }
    //     }
    //
    //     while (x1 <= x2) {
    //         // while (inside(board, x1, y)) {
    //         //     board[x1][y].floodFilled = true;
    //         //     x1 = x1 + 1;
    //         // }
    //         while (x1 <= x2 && inside(board, x1, y) && board[x1][y].fill === '·') {
    //             board[x1][y].floodFilled = true;
    //             x1 = x1 + 1;
    //         }
    //
    //
    //         if (x1 > x) {
    //             stack.push([x, x1 - 1, y + dy, dy]);
    //         }
    //
    //         if (x1 - 1 > x2) {
    //             stack.push([x2 + 1, x1 - 1, y - dy, -dy]);
    //         }
    //
    //         x1 = x1 + 1;
    //
    //         while (x1 < x2 && !inside(board, x1, y)) {
    //             x1 = x1 + 1;
    //         }
    //
    //         x = x1;
    //     }
    // }
    // return board;
// }
function inside(board, x, y){
    return isValidPosition(board, x, y);// && !board[x][y].floodFilled && board[x][y].fill === '·';
}
