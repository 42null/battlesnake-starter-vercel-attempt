export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  const snakeInfo = {
    apiversion: "1",
    author: "42null", //Username for play.battlesnake
    color: "#000000",
    head: "default",
    tail: "default",
  };

  res.json(snakeInfo);
}
