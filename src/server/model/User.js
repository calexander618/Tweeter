const _ = require('lodash');
const RedisConfiguration = require('../config');
const client = new RedisConfiguration();

module.exports = class User {
    constructor(userData) {
        Object.assign(this, _.cloneDeep(userData));
    }

    async save() {
        if (!client.connection) {
            client.start("localhost", 6379);
        }
        if (this.id) {
            return await this.update();
        }

        let existingUsername = await client.connection.hexistsAsync('users', this.username);

        if (existingUsername) {
            return Promise.reject(new Error("That username already exists."));
        }
     
        let id = await client.connection.incrAsync('new_id');
        this.id = id;

        await this.update();

        return Promise.resolve(this);
    }

    async update() {
        if (!client.connection) {
            client.start("localhost", 6379);
        }

        await Promise.all([
            client.connection.hsetAsync('users', this.username, this.id),
            client.connection.hmsetAsync('user:' + this.id, this)
        ]);

        client.quit();
    }

    async fetch() {
        if (!client.connection) {
            client.start("localhost", 6379);
        }

        let id = await client.connection.hgetAsync('users', this.username);
        if (!id) {
            return Promise.reject(new Error("That username does not exist."));
        }
        let user = await client.connection.hgetallAsync('user:' + id);

        return Promise.resolve(user);
    }

    delete() {

    }
}