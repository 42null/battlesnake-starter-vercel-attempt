
import {generateFilledArrayBoard, isValidPosition, printBoard} from "./helpers.js";
import { setName } from "./index.js";


import { PredictorBoard } from "./predictor.js";
import { TreeSearch, StrategyEnums } from "./treeSearch.js";
import {floodFill} from "./algorithms";
import {setCachedData} from "../dataCache";

export let myName = 'info run + ping not yet ran';

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  const gameState = req.body;

  if (req.method !== "POST") {
    res.status(404).json({ message: "Only for POST" });
    return;
  }

  if (!gameState) {
    res.status(400).json({ message: "Missing gamestate" });
    return;
  }
  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  const predictor = new PredictorBoard(gameState);

  // Snake details
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];
  const myLength = gameState.you.length;

  const _boardMaxX = gameState.board.width - 1;
  const _boardMaxY = gameState.board.height - 1;

  console.log(`Turn # ${gameState.turn} (Current)`);
  // printBoard(predictor.getBoard());
  console.log("(Expected)");

  const startTime = new Date();
  let endTime = 0;

  predictor.predictOpponentsNextTurn('X');

  const floodFillDirections = predictor.calculateFill(myHead.x, myHead.y);

  floodFillDirections.forEach(counter => {
    console.log(counter.direction+": "+counter.count);
  });

  let maxSames = [ floodFillDirections[0] ];
  for (let i = 1; i < floodFillDirections.length; i++) {
    if(floodFillDirections[i].count > maxSames[0].count){
      maxSames = [ floodFillDirections[i] ];
    }else if(floodFillDirections[i].count === maxSames[0].count){
      maxSames.push( floodFillDirections[i] );
    }
  }
  printBoard(predictor.getBoard());
  const newData = {
    message: {getBoard: predictor.getBoard()},
    timestamp: new Date(),
  };
  setCachedData(newData);

  endTime = new Date();
  console.log((endTime - startTime)+"ms");

  if(maxSames[0].count !== 0){
    res.status(200).json({ move: maxSames[Math.floor(Math.random() * maxSames.length)].direction });
    return;
  }else{//Fallback - flood-fill is using a prediction so can state that no spaces are available when they are, fallback to starter-simple
    console.log("FALLBACK");
    const predictorNoFuture = new PredictorBoard(gameState);
    const floodFillDirectionsNoFuture = predictorNoFuture.calculateFill(myHead.x, myHead.y);

    floodFillDirectionsNoFuture.forEach(counter => {
      console.log(counter.direction+": "+counter.count);
    });

    let maxSamesNoFuture = [ floodFillDirectionsNoFuture[0] ];
    for (let i = 1; i < floodFillDirectionsNoFuture.length; i++) {
      if(floodFillDirectionsNoFuture[i].count > maxSamesNoFuture[0].count){
        maxSamesNoFuture = [ floodFillDirectionsNoFuture[i] ];
      }else if(floodFillDirectionsNoFuture[i].count === maxSamesNoFuture[0].count){
        maxSamesNoFuture.push( floodFillDirectionsNoFuture[i] );
      }
    }

    res.status(200).json({ move: maxSamesNoFuture[Math.floor(Math.random() * maxSamesNoFuture.length)].direction });
    return;
  }
}
