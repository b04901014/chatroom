const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const getPort = require('get-port');

var userids = [];
const port = process.env.PORT | 8001;
console.log('Listening at ', port);

var hist = [{name: "Default Room", msgs: []}];

function getname() {
  var tmp = [];
  for (var i = 0; i < hist.length; i++)
    tmp.push(hist[i].name);
  return tmp;
}

io.on('connection', (socket) => {
  socket.on('get_msg', function(m) {
    hist[socket.room].msgs.push({id: socket.id, msg: m.msg, name: socket.nickname});
    io.sockets.in(String(socket.room)).emit('send_msg', {id: socket.id, msg: m.msg, name: socket.nickname});
  });
  socket.on('adduser', (data) => {
    socket.join('0');
    socket.room = 0;
    socket.nickname = data.name;
    userids.push(socket.id);
    io.sockets.in(String(socket.room)).emit("def_hist", {hist: hist[socket.room].msgs});
    io.sockets.emit("def_room", {rooms: getname()});
  });
  socket.on('disconnect', () => {
    idx = userids.indexOf(socket.id);
    userids.splice(idx, 1);
  });
  socket.on('chroom', (data) => {
    socket.leave(String(socket.room));
    socket.room = data.room;
    socket.join(String(data.room));
    hist[socket.room].msgs.push({id: 'System', msg: socket.nickname + " has entered!", name: "System"});
    io.sockets.in(String(socket.room)).emit("def_hist", {hist: hist[socket.room].msgs});
  });
  socket.on('newroom', (data) => {
    socket.leave(String(socket.room));
    socket.room = hist.length;
    hist.push({name: data.name, msgs:[{id: 'System', msg:"Welcome to a new room!", name: "System"}]});
    socket.join(String(socket.room));
    io.sockets.emit("def_room", {rooms: getname()});
  });

});


server.listen(port);
