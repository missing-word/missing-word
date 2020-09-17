var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);




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
    }else{}
  })

  socket.on('word',(word)=>{
    message += word
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
    if (message === payload){
      
    }
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});



