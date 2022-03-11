const { createHash } = require("crypto");
const mongo = require("../lib/mongo");

const ObjectID = require("mongodb").ObjectId;
function getUsers() {
  return mongo.then((client) => {
    return client.db("apisample").collection("users").find({}).toArray();
  });
}
function getUser(username) {
  return mongo.then((client) => {
    return client.db("apisample").collection("users").findOne({ username });
  });
}

function getUserByToken(token) {
  return mongo.then((client) => {
    return client.db("apisample").collection("users").findOne({ token });
  });
}
function createUser(username, rawPassword, role) {
  return mongo.then((client) => {
    return client
      .db("apisample")
      .collection("users")
      .insertOne({
        username,
        passwordHash: hash(rawPassword),
        role,
        token,
      });
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

function updateUserToken(username, token) {
  return mongo.then((client) => {
    return client
      .db("apisample")
      .collection("users")
      .updateOne({ username }, { $set: { token } });
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

function hash(string) {
  return createHash("sha256").update(string).digest("hex");
}

const user = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  hash,
  getUserByToken,
  updateUserToken,
};
module.exports = user;
