// imports
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import gradeRoutes from "./routes/gradeRoutes.mjs";
import { connectToDatabase } from "./db/conn.mjs";

// SetUps
const app = express();
dotenv.config();
let PORT = process.env.PORT || 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// routes
app.use("/grades", gradeRoutes);
router.get("/:id", gradesController.getSingleGrade);
router.get("/student/:id", gradesController.getStudentGrades);
router.get("/class/:id", gradesController.getClassGrades);
router.post("/", gradesController.createGrade);
router.get("/stats" /* your stats function here */);
router.get("/stats/:id" /* your stats function here */);

/* Create a GET route at /grades/stats within this route, create an aggregation pipeline that returns the
 * 1 - The number of learners with a weighted average (as calculated by the existing routes) higher than 70%.
 * 2 - The total number of learners.
 * 3 - The percentage of learners with an average above 70% (a ratio of the above two outputs).
 */
const startServer = async () => {
  await connectToDatabase();
  app.use(express.json());
};

connectToDatabase()
  .then(() => {
    app.use("/grades", gradesRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

// listener
app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});

startServer().catch((err) => console.error(err));
