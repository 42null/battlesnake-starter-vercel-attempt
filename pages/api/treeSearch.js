import { printPath, isValidPosition } from "./helpers.js";

export const StrategyEnums = Object.freeze({
    MostOptions: 0,
});

export class P {
    constructor(x, y, directonTaken) {
        this.x = x;
        this.y = y;
        this.d = directonTaken;
    }
}

export class TreeSearch {
    constructor(board, startingX, startingY) {
        this.boardArray = board;
        // this.starting = {"x": startingX, "y": startingY};
        this.starting = new P(startingX, startingY);
        this.paths = [];
    }

    getPoint(x, y) {
        return this.boardArray[x][y].future;
    }

    checkSurroundings(p, targetNum) {
        const surroundings = [];

        const addIfValid = (x, y, direction) => {
            if (isValidPosition(this.boardArray, x, y) && this.boardArray[x][y].future === targetNum) {
                surroundings.push(new P(x, y, direction));
            }
        };

        addIfValid(p.x - 1, p.y, "left");
        addIfValid(p.x + 1, p.y, "right");
        addIfValid(p.x, p.y - 1, "down");
        addIfValid(p.x, p.y + 1, "up");

        return surroundings;
    }

    generatePaths(numIndex) {
        //Yes I know this isn't a very efficent way to do trees, but I am getting a working prototype done

        numIndex++;
        const aviablePaths = this.checkSurroundings(this.starting, numIndex++);
        for (let i = 0; i < aviablePaths.length; i++) {
            // console.log(aviablePaths[i].x,aviablePaths[i].y,aviablePaths[i].d);
            this.paths.push([aviablePaths[i]]);
        }
        const currentPathsTotal = this.paths.length;
        for (let i = 0; i < currentPathsTotal; i++) {
            const currentPath = this.paths[0];
            const nextOptions = this.checkSurroundings(currentPath[0], numIndex);
            for (let j = 0; j < nextOptions.length; j++) {
                this.paths.push([...currentPath, nextOptions[j]]);
                // console.log([...currentPath, nextOptions[j]]);
            }
            this.paths.shift(1);
            // console.log(aviablePaths[i].x,aviablePaths[i].y,aviablePaths[i].d);
        }
    }

    pickPath(strategy) {
        // console.log(JSON.stringify(this.paths));
        // console.log("this.paths = " + JSON.stringify(this.paths));
        const condensed = this.paths.map((path) => path.map((point) => point.d));
        // condensed.forEach(item => printPath(item));
        console.log("----");
        for (let i = 0; i < condensed.length; i++) {
            if (condensed[i].length < 2) {
                console.log("!!!!!!! should not move there");
                condensed.splice(i--, 1);
            }
        }
        // condensed.forEach((item) => printPath(item));
        console.log();

        switch (strategy) {
            case StrategyEnums.MostOptions:
                // TODO: WILL MAKE MORE EFFICIENT ASAP
                let counters = [{count: 0, direction: "up"},
                                {count: 0, direction: "down"},
                                {count: 0, direction: "left"},
                                {count: 0, direction: "right"}];

                condensed.forEach((path) => {
                    // console.log("PATH" + JSON.stringify(path));

                    for(let i = 0; i < counters.length; i++){
                        if (path[0] === counters[i].direction) {
                            counters[i].count++;
                            break;
                        }
                    }
                });
                // condensed.forEach((path) => {
                //   if (path[0] === "up") {
                //     forUpB++;
                //   } else if (path[0] === "down") {
                //     forDownB++;
                //   } else if (path[0] === "left") {
                //     forLeftB++;
                //   } else if (path[0] === "right") {
                //     forRightB++;
                //   }
                // });
                console.log("Votes", counters[0].count, counters[1].count, counters[2].count, counters[3].count);

                let maxSames = [ counters[0] ];
                for (let i = 1; i < counters.length; i++) {
                    if(counters[i].count > maxSames[0].count){
                        maxSames = [ counters[i] ];
                    }else if(counters[i].count === maxSames[0].count){
                        maxSames.push( counters[i] );
                    }
                }
                // maxSames.forEach(same => {
                //     console.log("SAME: "+same.direction +"__"+same.count);
                // })
                return maxSames[Math.floor(Math.random() * maxSames.length)].direction;

                break;
            default:
                console.log(`Sorry, strategy "${strategy}" is not a valid strategy.`);
        }
        // Choose path;
        return "backup"; //Default option
    }
}
