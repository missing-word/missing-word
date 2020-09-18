var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const port = 3001;

app.get("/", (req, res) => {
  res.send(`ready to start`);
});
let player = [];
let counter = 0;
let message = "";
let playerFirst = "";
io.on("connection", (socket) => {
  console.log("a user connected");
  if (counter === 4) {
    console.log("selesai");
  }
  socket.on("ready", (payload) => {
    if (player.length > 1) {
      player.shift();
    }
    player.push(payload);
    console.log(player);
  });
  socket.on("start", () => {
    playerFirst += player[1].username;
    console.log(playerFirst, "first turn");
    socket.emit("firstTurn", playerFirst);
    playerFirst = "";
  });
  socket.on("notif", () => {
    console.log("masuk notif");
    socket.broadcast.emit("notif", "false");
  });
  socket.on("word", (word) => {
    message = word.toUpperCase();
    let wordArr = word.split("");
    const trueWord = [];
    const missArr = [];
    let count = 0;
    for (let i = 0; i < wordArr.length; i++) {
      trueWord.push(wordArr[i].toUpperCase());
      let random = Math.round(Math.random());
      if (random === 1 && count < 3) {
        missArr.push("_");
        count++;
      } else {
        missArr.push(wordArr[i].toUpperCase());
      }
    }
    console.log(missArr);
    console.log(trueWord);
    socket.broadcast.emit("trueWord", trueWord);
    socket.broadcast.emit("missingWord", missArr);
    counter++;
  });
  socket.on("answer", (payload) => {
    console.log(payload);
    console.log(message === payload.message.toUpperCase());
    if (message === payload.message.toUpperCase()) {
      console.log(player);
      for (const el of player) {
        if (el.username === payload.username) {
          el.points += 10;
          socket.emit("getPoint", el);
          console.log(counter);
          word = "";
          break;
        }
      }
    } else {
      for (const el of player) {
        if (el.username !== payload.username) {
          el.points += 10;
          socket.broadcast.emit("getPoint", el);
          word = "";
          break;
        }
      }
    }
  });
  socket.on("disconnect", (reason) => {
    if (reason === "io client disconnect") {
      player = [];
      counter = 0;
    }
  });
});
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
