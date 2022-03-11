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
      .findOne({ _id: new ObjectID(id) });
  });
}

function createUser(user) {
  return mongo.then((client) => {
    return client.db("apisample").collection("users").insertOne(user);
  });
}

function updateUser(id, user) {
  return mongo.then((client) => {
    return client
      .db("apisample")
      .collection("users")
      .updateOne({ _id: new ObjectID(id) }, { $set: user });
  });
}

function deleteUser(id) {
  return mongo.then((client) => {
    return client
      .db("apisample")
      .collection("users")
      .deleteOne({ _id: new ObjectID(id) });
  });
}

const user = { getUsers, getUser, createUser, updateUser, deleteUser };

module.exports = user;
