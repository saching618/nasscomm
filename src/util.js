const redis = require('redis')
client = redis.createClient();


client.on("error", function (err) {
    console.log("Error " + err);
});
const setToken = function(token) {
    client.set('token', token)
}

const getToken = function() {
    return new Promise((reject, resolve) => {
        client.get('token', function(err, reply) {
            if (err) reject('Token Not Found');
            resolve(reply)
        })   
    }) 
}

module.exports = {setToken,getToken}