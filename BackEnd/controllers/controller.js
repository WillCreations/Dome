const Workout = require("../database/Schema");

//get all workout
const getWorkouts = async (req, res) => {
  const user_id = req.user._id
  try {
    const workouts = await Workout.find({user_id}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Workouts" });
  }
};

//get a single workout

const singleWorkout = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "IDDDD");
    const workouts = await Workout.find({ _id: id });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch singleWorkout " });
  }
};

//create new workout

const createWorkout = async (req, res) => {
  const { admin , _id} = req.user;
  try {
    if (!admin) {
      throw Error("access denied");
    } else {
      console.log("body: ", req.body);
      const { name, load, reps } = req.body;

      console.log(name, load, reps, _id);

      const workout = await Workout.create({
        name,
        load,
        reps,
        user_id: _id
      });

      res.status(200).json(workout);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "IDDDD");
    const workouts = await Workout.findByIdAndDelete({ _id: id });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Workout" });
  }
};

//update a workout
const updateWorkout = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    console.log(id, "IDDDD");
    const workouts = await Workout.findByIdAndUpdate(id, update);
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Workout " });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  singleWorkout,
  deleteWorkout,
  updateWorkout,
};
