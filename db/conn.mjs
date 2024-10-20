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
    // connect to client
    const conn = await client.connect();
    console.log(`MongoDB is connected`);

       db = conn.db("sample_training");

    // Object confirmation
    // Console.log("Database object:", db);
  } catch (err) {
    console.error("Connection error:", err);
  }
};


export default db; 
