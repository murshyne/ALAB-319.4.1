// Imports
import express from "express";
import gradesCTL from "../controllers/gradesController.mjs";
import db from "../db/conn.mjs";
// import { ObjectId } from "mongodb";

const router = express.Router();

// Aggregation for overall stats
router.get("/stats", async (req, res) => {
  try {
    const result = await db
      .collection("grades")
      .aggregate([
        {
          $group: {
            _id: null,
            totalLearners: { $sum: 1 },
            above70: {
              $sum: {
                $cond: [{ $gt: ["$weightedAverage", 70] }, 1, 0],
              },
            },
          },
        },
        {
          $project: {
            totalLearners: 1,
            above70: 1,
            percentageAbove70: {
              $multiply: [{ $divide: ["$above70", "$totalLearners"] }, 100],
            },
          },
        },
      ])
      .toArray();

    res.json(
      result[0] || { totalLearners: 0, above70: 0, percentageAbove70: 0 }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Aggregation for stats by class_id
router.get("/stats/:id", async (req, res) => {
  const classId = parseInt(req.params.id, 10);

  try {
    const result = await db
      .collection("grades")
      .aggregate([
        { $match: { class_id: classId } },
        {
          $group: {
            _id: null,
            totalLearners: { $sum: 1 },
            above70: {
              $sum: {
                $cond: [{ $gt: ["$weightedAverage", 70] }, 1, 0],
              },
            },
          },
        },
        {
          $project: {
            totalLearners: 1,
            above70: 1,
            percentageAbove70: {
              $multiply: [{ $divide: ["$above70", "$totalLearners"] }, 100],
            },
          },
        },
      ])
      .toArray();

    res.json(
      result[0] || { totalLearners: 0, above70: 0, percentageAbove70: 0 }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
