var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const port = 3001;

app.get("/", (req, res) => {
  res.send(`ready to start`);
});
let player = [];
let matchRound = 0;
let message = "";
let playerFirst = "";
io.on("connection", (socket) => {
  console.log("a user connected")
  socket.on("ready", (payload) => {
    if (player.length > 1) {
      player.shift();
    }
    player.push(payload);
    console.log(player);
    if(player.length === 2){
      io.emit('startGame', true)
    }
  });
  socket.on("start", () => {
    playerFirst += player[1].username;
    console.log(playerFirst, "first turn");
    io.emit("firstTurn", playerFirst);
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
          socket.broadcast.emit('benar', 'Unfortunately! Your rival hit the right answer!')
          socket.emit('notifBenar', 'Yeay! You hit the right answer, you got 10 points!')          
          word = "";
          break;
        }
      }
    } else {
      for (const el of player) {
        if (el.username !== payload.username) {
          el.points += 10;
          socket.broadcast.emit("getPoint", el);
          socket.emit('salah', 'Unfortunately! You hit the wrong answer :(')
          socket.broadcast.emit('notifSalah', 'Yeay! Your rival hit the wrong answer, you got 10 points!')
          word = "";
          break;
        }
      }
    }
    matchRound++
    console.log(player);
    console.log(matchRound, '<<< game round');
    io.emit('changeTurn', payload.username)
    if(matchRound == 4){
      let points = 0
      let winner = ''
      for(const el of player){
        if(el.points > points){
          winner = el.username
        }
      }
      if(winner === payload.username){
        socket.emit('gameOver', 'Game Over! You are the winner, yeay!')
        socket.broadcast.emit('gameOver', `Game Over! ${winner} is the winner!`)
      }else{
        socket.emit('gameOver', `Game Over! ${winner} is the winner!`)
        socket.broadcast.emit('gameOver', `Game Over! You are the winner, yeay!`)
      }
      player = [];
      matchRound = 0;
      console.log(player, matchRound);
    }

  });
  socket.on("disconnect", (reason) => {
    if (reason === "io client disconnect") {
      player = [];
      matchRound = 0;
    }
  });
});
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
