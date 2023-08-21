const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../util/config')

let getAsync
let setAsync

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  // unlike in other databases
  // running redis.createClient() already instantiates a connection
  const client = redis.createClient({
    url: REDIS_URL
  })
    
  // bind binds the function to the client
  // so client.<get | set> can be called from within
  // as client will be "this"

  // without promisify:
  // Retrieving a value from Redis
  // client.get('myKey', (error, result) => {
  //   if (error) {
  //     console.error('Error:', error);
  //   } else {
  //     console.log('Value:', result);
  //   }
  // });
  getAsync = promisify(client.get).bind(client)
  setAsync = promisify(client.set).bind(client)    
}

module.exports = {
  getAsync,
  setAsync
}