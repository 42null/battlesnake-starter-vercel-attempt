export default function handler(req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    const snakeInfo = {
        apiversion: "1",
        author: "42null",
        color: "#2e77ff",//Color for deployed remote version, controlled via gitignore
        head: "nr-rocket",
        tail: "bolt",
    };

    res.json(snakeInfo);
}