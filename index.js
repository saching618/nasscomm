var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

const api = require('./src/api');

var token = null;
var email = null;
api.redisClient.get('token', function(err, reply) {
    if (err) {
       console.log('Something went wrong.');
    }
    if (reply) {
      token = reply;
    } else{
      console.log("Unauthorized");
      token = api.getAccessToken('keshariratnesh9@gmail.com');
    }
})

app.get('/', function(req, res){
  email = req.query.email;
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    // io.emit('chat message', msg);
    api.convertText([msg],'hi', 'en', token).then((response) => {
      io.emit('chat message',response.data.data['result'][0][0]);
      console.log(response.data.data['result']);
    })
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});


// http://localhost:3000/?email=keshariratnesh@gmail.com