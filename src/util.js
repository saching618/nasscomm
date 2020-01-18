const redis = require('redis')
client = redis.createClient();


client.on("error", function (err) {
    console.log("Error " + err);
});
const setToken = function(email, token) {
    client.set(email, token);
}


// Deprecated
// const validateToken = function(token) {
//     return new Promise((reject, resolve) => {
//         client.get(token, function(err, reply) {
//             if (err) reject('Some thing went wrong!');
//             console.log('fasfjkjdshf');
//             resolve(reply);
//         })  
//     }) 
// }

module.exports = {setToken, client}