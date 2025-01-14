import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const url = process.env.ATLAS_URL || "";
if (!url) {
  throw new Error("MongoDB connection string (ATLAS_URL) is missing!");
}

let client, db;

// connect to database
const connectToDatabase = async () => {
  if (db) return db;

  try {
    client = new MongoClient(url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    console.log("Connect to database successfully");

    // the database name
    db = client.db("meetydb");
    return db;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};

// disconnect from database
const disconnectDatabase = async () => {
  if (client) {
    await client.close();
    console.log("MongoDB disconnected");
  }
};

process.on("SIGINT", async () => {
  await disconnectDatabase();
  process.exit(0);
});

export { connectToDatabase, disconnectDatabase };
