const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const getPort = require('get-port');

var userids = [];
const port = process.env.PORT | 8001;
console.log('Listening at ', port);

var hist = [];

io.on('connection', (socket) => {
  socket.on('get_msg', function(m) {
    hist.push({id: socket.id, msg: m.msg, name: socket.nickname});
    io.emit('send_msg', {id: socket.id, msg: m.msg, name: socket.nickname});
  });
  socket.on('adduser', (data) => {
    socket.nickname = data.name;
    userids.push(socket.id);
    io.emit("def_hist", {hist});
  });
  socket.on('disconnect', () => {
    idx = userids.indexOf(socket.id);
    userids.splice(idx, 1);
  });

});


server.listen(port);
