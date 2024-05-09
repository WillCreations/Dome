const { model, models, Schema } = require("mongoose");

const workoutSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    load: {
      type: Number,
      required: true,
    },

    reps: {
      type: Number,
      required: true,
    },

    user_id: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Workout = models.Workouts || model("Workouts", workoutSchema);

module.exports = Workout;
