import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Create connection string
const connectionString = process.env.atlasURI || "";

const client = new MongoClient(connectionString);

let db; // Declare db variable

(async () => {
  try {
    // Try to connect to client
    const conn = await client.connect(); // Connect and assign to conn
    console.log(`MongoDB is connected`);

    db = conn.db("sample_training"); // Now set db inside the try block
    console.log("Database object:", db); // Log the db object for confirmation
  } catch (err) {
    console.error("Connection error:", err);
  }
})();

export default db; // Export db after the connection attempt
