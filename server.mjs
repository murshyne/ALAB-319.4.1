// imports
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import gradeRoutes from "./routes/gradeRoutes.mjs";
import db from "./db/conn.mjs";

// SetUps
const app = express();
dotenv.config();
let PORT = process.env.PORT || 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// routes
app.use("/grades", gradeRoutes);

/* Create a GET route at /grades/stats within this route, create an aggregation pipeline that returns the
 * 1 - The number of learners with a weighted average (as calculated by the existing routes) higher than 70%.
 * 2 - The total number of learners.
 * 3 - The percentage of learners with an average above 70% (a ratio of the above two outputs).
 */

app.get("/grades/stats", async (req, res) => {
  try {
const result = await db.collection("grades").aggregate([
    {
        $group: {
            _id: null,
            totalLearner: { $sum: 1 },
            above70: {
              $sum: {
                $cond: [{ $gt: ["$weightedAverage", 70] }, 1, 0],
              },
            },
          },
        },
        {
          $project: {
            totalLearner: 1,
            above70: 1,
            percentageAbove70: {
              $multiply: [{ $divide: ["$above70", "$totalLearner"] }, 100],
            },
          },
        },
      ])
      .toArray();

    res.json(
      result[0] || { totalLearner: 0, above70: 0, percentageAbove70: 0 }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// listener
app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});
