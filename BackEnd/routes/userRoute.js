const express = require("express");
const {
  createUser,
  getUsers,
  singleUser,
  deleteUser,
  updateUser,
  Signup,
  Login,
} = require("../controllers/userControl");

const router = express.Router();

//GET all workouts
router.get("/", getUsers);

//GET a single workout
router.get("/:id", singleUser);

//POST or create Workout
router.post("/", createUser);

//DELETE a workout
router.delete("/:id", deleteUser);

//UPDATE a workout
router.patch("/:id", updateUser);

//SIGNUP a user
router.post("/signup", Signup);
//lOGIN a user
router.post("/login", Login);

module.exports = router;
