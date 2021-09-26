const { connectDb } = require("../utils/db");

let db = null;

async function createIndex(db) {
}

async function initDb() {
  if (!db) {
    db = await connectDb(
      process.env.MONGO_DB_NAME || "voting"
    );
    await createIndex(db);
  }
}

async function getDb() {
  if (!db) {
    await initDb();
  }
  return db;
}

async function getCollection(colName) {
  const db = await getDb();
  return db.getCollection(colName);
}

module.exports = {
  initDb,
  getDb,
  getPostCollection: () => getCollection("post"),
  getCommentCollection: () => getCollection("comment"),
  getReactionCollection: () => getCollection("reaction"),
  getStatusCollection: () => getCollection("status"),
};
