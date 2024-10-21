import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

// Get single grade entry by id
async function getSingleGrade(req, res) {
  try {
    if (!db) {
      return res.status(500).json({ msg: "Database not connected" });
    }

    let query = { _id: new ObjectId(req.params.id) };
    let result = await db.collection("grades").findOne(query);

    if (!result) {
      return res.status(404).json({ msg: "Grade not found" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
}

// Export your functions as before
export default getSingleGrade;
