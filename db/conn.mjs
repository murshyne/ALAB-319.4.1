import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Create connection string
const connectionString = process.env.atlasURI || "";

const client = new MongoClient(connectionString);

// Declare db variable
let db;

const connectToDatabase = async () => {
  try {
    await client.connect();
    db = client.db("your_database_name"); // Replace with your database name
    console.log("Connected to database");
    await createIndexes(); // Call index creation after connecting
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

const createIndexes = async () => {
  try {
    await db.collection("grades").createIndex({ class_id: 1 });
    await db.collection("grades").createIndex({ learner_id: 1 });
    await db.collection("grades").createIndex({ learner_id: 1, class_id: 1 });
    console.log("Indexes created");
  } catch (err) {
    console.error("Error creating indexes:", err);
  }
};

export { connectToDatabase };
export default db;
