var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Register events on socket connection
io.on('connection', function(socket){
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg);
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
  socket.on("addUser", function(user) {
    socket.broadcast.emit("addUser", user);
  });
});


http.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
