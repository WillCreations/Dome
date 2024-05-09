import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import moment from "moment";

const Card = ({ workout, session }) => {
  const { dispatch } = useWorkoutsContext();
  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:4000/api/workouts/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );

    const json = await response.json();

    dispatch({ type: "DELETE_WORKOUT", payload: json });
  };
  return (
    <div className="card">
      <h4>{workout.name}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{moment(workout.createdAt).calendar()}</p>
      <div onClick={() => handleDelete()} className="delete">
        x
      </div>
    </div>
  );
};

export default Card;
