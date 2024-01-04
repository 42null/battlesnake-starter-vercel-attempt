
import {generateFilledArrayBoard, isValidPosition, printBoard} from "./helpers.js";

import { PredictorBoard } from "./predictor.js";
import { TreeSearch, StrategyEnums } from "./treeSearch.js";
import {floodFill} from "./algorithms";

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
  // maxSames.forEach(same => {
  //     console.log("SAME: "+same.direction +"__"+same.count);
  // })


  // predictor.predictNextTurn('');
  // // printBoard(predictor.getBoard());
  // predictor.predictNextTurn('');
  //
  // printBoard(predictor.getBoard(), "floodFill");
  printBoard(predictor.getBoard());


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

    // // Check for paths available
    // // const treeSearch = new TreeSearch( predictor.getBoard(), myHead.x, myHead.y );
    // // treeSearch.generatePaths(myLength);
    // // const pickedMove = treeSearch.pickPath(StrategyEnums.MostOptions);
    //
    // // CHECK for collisions with neck
    // if (myNeck.x < myHead.x) {
    //   isMoveSafe.left = false;
    // } else if (myNeck.x > myHead.x) {
    //   isMoveSafe.right = false;
    // } else if (myNeck.y < myHead.y) {
    //   isMoveSafe.down = false;
    // } else if (myNeck.y > myHead.y) {
    //   isMoveSafe.up = false;
    // }
    // // CHECK for collisions with walls.
    // if (myHead.x == 0) {
    //   isMoveSafe.left = false;
    // } else if (myHead.x == _boardMaxX) {
    //   isMoveSafe.right = false;
    // }
    // if (myHead.y == 0) {
    //   isMoveSafe.down = false;
    // } else if (myHead.y == _boardMaxY) {
    //   isMoveSafe.up = false;
    // }
    // //
    // // // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
    // const myBody = gameState.you.body;
    // myBody.forEach(function (myBodyPoint) {
    //   if (myBodyPoint.y == myHead.y && myBodyPoint.x == myHead.x - 1) {
    //     isMoveSafe.left = false;
    //   } else if (myBodyPoint.y == myHead.y && myBodyPoint.x == myHead.x + 1) {
    //     isMoveSafe.right = false;
    //   } else if (myBodyPoint.x == myHead.x && myBodyPoint.y == myHead.y - 1) {
    //     isMoveSafe.down = false;
    //   } else if (myBodyPoint.x == myHead.x && myBodyPoint.y == myHead.y + 1) {
    //     isMoveSafe.up = false;
    //   }
    // });
    // //
    // // // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
    // const opponents = gameState.board.snakes;
    // opponents.forEach(function (opponent) {
    //   // Only the body of the oponent (no head) if can win in head on
    //   opponent.body
    //       // .slice(opponent.length >= myLength ? 0 : 1)
    //       .forEach(function (opponentBodyPart) {
    //         if (
    //             opponentBodyPart.y == myHead.y &&
    //             opponentBodyPart.x == myHead.x - 1
    //         ) {
    //           isMoveSafe.left = false;
    //         } else if (
    //             opponentBodyPart.y == myHead.y &&
    //             opponentBodyPart.x == myHead.x + 1
    //         ) {
    //           isMoveSafe.right = false;
    //         } else if (
    //             opponentBodyPart.x == myHead.x &&
    //             opponentBodyPart.y == myHead.y - 1
    //         ) {
    //           isMoveSafe.down = false;
    //         } else if (
    //             opponentBodyPart.x == myHead.x &&
    //             opponentBodyPart.y == myHead.y + 1
    //         ) {
    //           isMoveSafe.up = false;
    //         }
    //       });
    // });
    // //
    // // // Are there any safe moves left?
    // const safeMoves = Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
    // if (safeMoves.includes(pickedMove)) {
    //   //TODO: Only here with repeat check to account for snake eating and length being off.
    //   res.status(200).json({ move: pickedMove });
    //   return;
    // }
    // console.log("!!!!!! Skipped predicted move!!!!");
    // if (safeMoves.length === 0) {
    //   console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    //   res.status(200).json({ move: "down" });
    //   return;
    // }
    //
    // // Choose a random move from the safe moves
    // // const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    //
    // // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
    // // food = gameState.board.food;
    //
    // // console.log(`MOVE ${gameState.turn}: ${nextMove}`);
    // // console.log(`MOVE ${gameState.turn}: ${nextMove}`);
    //
    // // res.status(200).json({ move: nextMove });
    return;
  }
}
