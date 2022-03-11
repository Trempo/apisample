const MongoClient = require("mongodb").MongoClient;
const url = `mongodb+srv://admin:admin@cluster0.phkww.mongodb.net/apisample`;

const mongo = new MongoClient(url);

module.exports = mongo.connect();
