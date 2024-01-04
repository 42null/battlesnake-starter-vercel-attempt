export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  //Not connected anymore to git tracking in order to diffrenteriate local & published copy in testing.
  const snakeInfo = {
    apiversion: "1",
    author: "42null",
    color: "#000000",
    head: "default",
    tail: "default",
  };

  res.json(snakeInfo);
}
