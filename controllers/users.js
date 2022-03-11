const { createHash } = require('crypto');
const mongo = require("../lib/mongo");

const ObjectID = require("mongodb").ObjectId;
function getUsers() {
    return mongo.then((client) => {
        return client.db("apisample").collection("users").find({}).toArray();
    });

}
function getUser(id) {
    return mongo.then((client) => {
        return client
            .db("apisample")
            .collection("users")
            .findOne({_id: new ObjectID(id)});
    });

}
function createUser(username, rawPassword, role) {
    return mongo.then((client) => {
        return client.db("apisample").collection("users").insertOne(
            {
                username,
                passwordHash: hash(rawPassword),
                role
            }
        );
    });

}
function updateUser(id, user) {
    return mongo.then((client) => {
        return client
            .db("apisample")
            .collection("users")
            .updateOne({_id: new ObjectID(id)}, {$set: user});
    });

}
function deleteUser(id) {
    return mongo.then((client) => {
        return client
            .db("apisample")
            .collection("users")
            .deleteOne({_id: new ObjectID(id)});
    });

}

const user = {getUsers, getUser, createUser, updateUser, deleteUser};

function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}
module.exports = user;
