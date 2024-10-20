import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';

// Get single grade entry by id
async function getSingleGrade(req, res) {
  try {
    let query = { _id: new ObjectId(req.params.id) };

    let collection = await db.collection('grades');

    let result = await collection.findOne(query);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

// Get grades by student id
async function getStudentGrades(req, res) {
  try {
    let query = { student_id: Number(req.params.id) };

    let collection = await db.collection('grades');

    let results = await collection.find(query).toArray();

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

// Get grades by classID
async function getClassGrades(req, res) {
  try {
    let query = { class_id: Number(req.params.id) };

    let collection = await db.collection('grades');

    let results = await collection.find(query).toArray();

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

// Create new grades in DB
async function createGrade(req, res) {
  try {
    let collection = await db.collection('grades');

    let result = await collection.insertOne(req.body);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

export default { getSingleGrade, getClassGrades, getStudentGrades, createGrade };
