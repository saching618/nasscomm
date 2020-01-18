
const util = require('./util')
const axios = require('axios')
const redisClient = util.client
function getAccessToken(email) {
  const client = axios.create({
    baseURL: `https://hackapi.reverieinc.com/token?email=${email}`,
    headers: { 'content-type': 'application/json' }
  });

  client.get().then(function (response) {
      util.setToken(response.data['message'], email)
  })
  .catch(function (error) {
    console.log(error);
  })
}

function convertText(text, tgt, src, token){

    const raw_data = {
        'data': text,
        'tgt': tgt,
        'src': src
    };

    const client = axios.create({
        baseURL: 'https://hackapi.reverieinc.com',
        headers: { 
            'content-type': 'application/json',
            'token': token
        }
      });

      client.post('/nmt', raw_data).then(function (response) {
          console.log('contentText response')
          console.log(response.data.data)
      })
      .catch(function (error) {
        console.log('contentText error response')
        console.log(error);
      })
}


var token = 'e8a79f08677139a4e990a14d511faae0c6c7841b';
redisClient.get(token, function(err, reply) {
  if (err) {
     console.log('Something went wrong.');
  }
  if (reply) {
    convertText(['hi Hello'],'hi', 'en', token);
    console.log(reply);
  } else{
    console.log("Unauthorized");
  }
})  
// convertText(['Hi Ramu'], 'hi', 'en', 'e8a79f08677139a4e990a14d511faae0c6c7841b');


function convertTextToAudio(text, lang, token){
    const raw_data = {
        'text': text,
        'lang': lang,
    };

    const client = axios.create({
        baseURL: 'https://hackapi.reverieinc.com',
        headers: { 
            'content-type': 'application/json',
            'token': token
        }
      });

      client.post('/tts', raw_data).then(function (response) {
          console.log('convertTextToAudio response')
          console.log(response.status)
          if(response.status ==200){
            let res = {};
            res['status'] =response.status;
            res['data'] =  response.data;
            console.log(res.data);
            return res;
          }else{
            let res = {};
            res['status'] =response.status;
            res['data'] = "error";
            console.log(res);
            return res;
          }
      })
      .catch(function (error) {
        console.log('convertTextToAudio error response')
        console.log(error);
      })

}

