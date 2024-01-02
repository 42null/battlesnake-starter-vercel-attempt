
import { generateFilledArrayBoard, printBoard } from "./helpers.js";

import { PredictorBoard } from "./predictor.js";
import { TreeSearch, StrategyEnums } from "./treeSearch.js";

// Game items set at start
let _boardMaxX = -1,
    _boardMaxY = -1;

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
  let isMoveKill = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  const predictor = new PredictorBoard(gameState);

  // Snake details
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];
  const myLength = gameState.you.length;
  console.log("~~~" + myLength);

  console.log(`Turn # ${gameState.turn} (Current)`);
  // printBoard(predictor.getBoard());
  console.log("(Expected)");
  predictor.predictNextTurn('');
  // printBoard(predictor.getBoard());
  predictor.predictNextTurn('');
  printBoard(predictor.getBoard());

  // Check for paths avaiable
  const treeSearch = new TreeSearch(
      predictor.getBoard(),
      myHead.x,
      myHead.y,
  );
  treeSearch.generatePaths(myLength);
  const pickedMove = treeSearch.pickPath(StrategyEnums.MostOptions);
  // if(pickedMove !== "backup"){
  //     return { move: pickedMove };
  // }

  // We've included code to prevent your Battlesnake from moving backwards
  // const myHead = gameState.you.body[0];
  // const myNeck = gameState.you.body[1];
  // const myLength = gameState.you.length;

  // let killOpponentLength = -1;

  // CHECK for collisions with neck
  if (myNeck.x < myHead.x) {
    isMoveSafe.left = false;
  } else if (myNeck.x > myHead.x) {
    isMoveSafe.right = false;
  } else if (myNeck.y < myHead.y) {
    isMoveSafe.down = false;
  } else if (myNeck.y > myHead.y) {
    isMoveSafe.up = false;
  }
  // CHECK for collisions with walls.
  if (myHead.x == 0) {
    isMoveSafe.left = false;
  } else if (myHead.x == _boardMaxX) {
    isMoveSafe.right = false;
  }
  if (myHead.y == 0) {
    isMoveSafe.down = false;
  } else if (myHead.y == _boardMaxY) {
    // console.log("Not safe up");
    isMoveSafe.up = false;
  }

  // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
  const myBody = gameState.you.body;
  myBody.forEach(function (myBodyPoint) {
    if (myBodyPoint.y == myHead.y && myBodyPoint.x == myHead.x - 1) {
      isMoveSafe.left = false;
    } else if (myBodyPoint.y == myHead.y && myBodyPoint.x == myHead.x + 1) {
      isMoveSafe.right = false;
    } else if (myBodyPoint.x == myHead.x && myBodyPoint.y == myHead.y - 1) {
      isMoveSafe.down = false;
    } else if (myBodyPoint.x == myHead.x && myBodyPoint.y == myHead.y + 1) {
      isMoveSafe.up = false;
    }
  });

  // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
  const opponents = gameState.board.snakes;
  opponents.forEach(function (opponent) {
    // Only the body of the oponent (no head) if can win in head on
    opponent.body
        // .slice(opponent.length >= myLength ? 0 : 1)
        .forEach(function (opponentBodyPart) {
          if (
              opponentBodyPart.y == myHead.y &&
              opponentBodyPart.x == myHead.x - 1
          ) {
            isMoveSafe.left = false;
          } else if (
              opponentBodyPart.y == myHead.y &&
              opponentBodyPart.x == myHead.x + 1
          ) {
            isMoveSafe.right = false;
          } else if (
              opponentBodyPart.x == myHead.x &&
              opponentBodyPart.y == myHead.y - 1
          ) {
            isMoveSafe.down = false;
          } else if (
              opponentBodyPart.x == myHead.x &&
              opponentBodyPart.y == myHead.y + 1
          ) {
            isMoveSafe.up = false;
          }
        });
  });

  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
  if (safeMoves.includes(pickedMove)) {
    //TODO: Only here with repeat check to account for snake eating and length being off.
    res.status(200).json({ move: pickedMove });
    return;
  }
  console.log("!!!!!! Skipped predicted move!!!!");
  if (safeMoves.length == 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    res.status(200).json({ move: "down" });
    return;
  }

  // Choose a random move from the safe moves
  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
  // food = gameState.board.food;

  // console.log(`MOVE ${gameState.turn}: ${nextMove}`);
  // console.log(`MOVE ${gameState.turn}: ${nextMove}`);

  res.status(200).json({ move: nextMove });
  return;
}
