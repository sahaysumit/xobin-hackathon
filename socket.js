var server = require('http').createServer();
var io = require('socket.io')(server);
var p2p = require('socket.io-p2p-server').Server;
server.listen(3030);
console.log('ok')

io.on('connection', function(socket){
  clients[socket.id] = socket;
  socket.join(roomName);
  p2p(socket, null, room);
  console.log('yes')
});