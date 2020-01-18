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

app.get('/convetToSpeech', function(req, res) {
   var data = req.body;
}) 



app.get('/', function(req, res){
  email = req.query.email;
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat_message', function(data){
    console.log(data);
    var result = JSON.parse(data);
    api.convertText([result.text], result.lang, 'en', token).then((response) => {
      
      if (response.data.status = 'Success') {
        io.emit('chat_message',response.data.data['result'][0][0]);
      } else {
        io.emit('chat_message', 'Sorry Service is down.');
      }

    }).catch(err => {
      console.log(err);
    })
  })

  socket.on('chat_message_audio', function(data){
    api.convertTextToAudio(result.text, 'en', token)
    .then(function (response) {
      console.log('convertTextToAudio response')
      console.log(response)
      if(response.status == 200){
        let res = {};
        res['status'] = response.status;
        res['data'] =  response.data;
        console.log(res.data);
        return res;
      }else{
        let res = {};
        res['status'] = response.status;
        res['data'] = "error";
        console.log(res);
        return res;
      }
    })
    .catch(err => {
      console.log('convertTextToAudio error response')
      console.log(err);
    })
  });

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});


 // api.convertTextToAudio(msg, 'en', token)
    //   .then(function (response) {
    //     console.log('convertTextToAudio response')
    //     console.log(response.status)
    //     if(response.status == 200){
    //       let res = {};
    //       res['status'] =response.status;
    //       res['data'] =  response.data;
    //       console.log(res.data);
    //       return res;
    //     }else{
    //       let res = {};
    //       res['status'] = response.status;
    //       res['data'] = "error";
    //       console.log(res);
    //       return res;
    //     }
    // })
    // .catch(err => {
    //   console.log('convertTextToAudio error response')
    //   console.log(err);
    // })