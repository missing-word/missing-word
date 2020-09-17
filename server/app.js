var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http)
const port = 3000

app.get('/', (req, res) => {
  res.send(`ready to start`);
});

let player = []
let counter = 1
const timeout = 1000
let message = ''
let playerFirst = ''


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('ready',(payload)=>{
    player.push(payload)

    if (player.length === 2){
      playerFirst += player[Math.round(Math.random()*2)].username
      socket.emit('firstTurn',playerFirst)
    }
  })

  socket.on('word',(word)=>{
    message = word
    let wordArr = word.split('')
    let sendArr = []
    let count = 0
    for (let i = 0 ; i< wordArr.length ;i++){
      let random = Math.round(Math.random())
      if (random === 1 && count < 3){
        sendArr.push('_')
        count++
      }else{
        sendArr.push(wordArr[i])
      }
    }
    socket.broadcast.emit('missingWord',sendArr)
    counter++
  })
  socket.on('answer',(payload)=>{
    if (message === payload.message){
      for(const el of player){
        if(el.username === payload.username){
          el.points += 10
          io.emmit('getPoint', el)
          word = ''
          break
        }
      }
    } else {
      for(const el of player){
        if(el.username !== payload.username){
          el.points += 10
          io.emmit('getPoint', el)
          word = ''
          break
        }
      }
    }
  })
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});



