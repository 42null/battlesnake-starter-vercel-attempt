export default function handler(req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    const snakeInfo = {
        apiversion: "1",
        author: "42null",
        color: "#ff0000",
        head: "default",
        tail: "default"
    };

    // if(determinedMyName === "Self Host Mac Testing"){
    //     snakeInfo.color = "#2e77ff";
    //     snakeInfo.head = "nr-rocket";
    //     snakeInfo.tail = "bolt";
    // }else if(determinedMyName === "transferred-vercel-attempt"){
        snakeInfo.color = "#000000";
    // }

    res.json(snakeInfo);
}