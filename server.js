const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
  io.sockets.emit('new connection', {
    text: 'New user is connected'
  })

  socket.on('chat message', (msg) => {
    io.sockets.emit('chat message', `${msg.currentUser}: ${msg.msg}`);
  })



  io.sockets.emit('disconnect', { text: 'A user has disconnected'});
  
});

http.listen(3000, () => {
  console.log(`listening on 3000`)
})
