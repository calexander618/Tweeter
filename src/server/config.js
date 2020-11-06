const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = class RedisConfiguration {
    start(hostName, portNum) {
        if (this.connection) {
            this.connection.quit();
            this.connection = null;
        }
        this.connection = redis.createClient({
            host: hostName,
            port: portNum
        });
    }

    quit() {
        if (!this.connection) {
            return;
        }
        this.connection.quit();
        this.connection = null;
    }
}