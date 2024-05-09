const express = require("express");
const {
  createWorkout,
  getWorkouts,
  singleWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//Verify Authorization token
router.use(requireAuth);

//GET all workouts
router.get("/", getWorkouts);

//GET a single workout
router.get("/:id", singleWorkout);

//POST or create Workout
router.post("/", createWorkout);

//DELETE a workout
router.delete("/:id", deleteWorkout);

//UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
