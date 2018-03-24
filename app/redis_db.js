
var redis = require('redis');

var redis_client = redis.createClient(6379,'redis');



exports.get = function() {
    return redis_client
}
