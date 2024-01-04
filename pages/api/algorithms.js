//FLOOD FILL
import {P} from "./treeSearch";
import { isValidPosition } from "./helpers.js";
import {patchConsoleError} from "next/dist/client/components/react-dev-overlay/internal/helpers/hydration-error-info";

export let lastFloodFillCounter = 0;//TODO: Make part of floodFill function

export function setLastFloodFillCounter(count){
    lastFloodFillCounter = count;
}
export function getLastFloodFillCounter(){
    return lastFloodFillCounter;
}

export function floodFill(board, x, y)
{

    if(!isValidPosition(board, x, y) || board[x][y].fill !== '·' || board[x][y].floodFilled === true){
        return board;
    } else {
        lastFloodFillCounter++;
        board[x][y].floodFilled = true;
        // board[x][y].fill = "░";
        board = floodFill(board, x + 1, y);
        board = floodFill(board, x - 1, y);
        board = floodFill(board, x, y + 1);
        board = floodFill(board, x, y - 1);

        return board;
    }
}

function inside(board, x, y){
    return isValidPosition(board, x, y);// && !board[x][y].floodFilled && board[x][y].fill === '·';
}
