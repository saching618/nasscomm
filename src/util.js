const redis = require('redis')
client = redis.createClient();


client.on("error", function (err) {
    console.log("Error " + err);
});
const setToken = function(token, email) {
    client.set(token, email)
}

const validateToken = function(token) {
    return new Promise((reject, resolve) => {
        client.get(token, function(err, reply) {
            if (err) reject('Some thing went wrong!');
            console.log('fasfjkjdshf');
            resolve(reply);
        })  
    }) 
}

module.exports = {setToken, client}