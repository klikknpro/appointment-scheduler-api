const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const startDb = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  const connection = await mongoose.connect(uri);
  return [connection, mongoServer];
};

const stopDb = async (connection, mongoServer) => {
  await connection.disconnect();
  await mongoServer.stop();
};

const deleteAll = async (...collections) => {
  const promises = collections.map((collection) => collection.deleteMany());
  await Promise.all(promises);
};

module.exports = { startDb, stopDb, deleteAll };
