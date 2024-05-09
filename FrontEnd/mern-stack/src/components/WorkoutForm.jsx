import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const [error, setError] = useState();
  const [state, setState] = useState({
    name: "",
    load: "",
    reps: "",
  });
  const { session } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = {
      name: state.name,
      load: state.load,
      reps: state.reps,
      user_id: session?.user._id,
    };

    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setState({
        ...state,
        name: "",
        load: "",
        reps: "",
      });
      setError(null);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="createForm" onSubmit={handleSubmit}>
      <h3>Add New Workout</h3>
      <div>
        <label htmlFor="">Title</label>
        <input
          type="text"
          onChange={(e) => setState({ ...state, name: e.target.value })}
          value={state.name}
        />
      </div>
      <div>
        <label htmlFor="">Load (in kg)</label>
        <input
          type="number"
          onChange={(e) => setState({ ...state, load: e.target.value })}
          value={state.load}
        />
      </div>
      <div>
        <label htmlFor="">Reps</label>
        <input
          type="number"
          onChange={(e) => setState({ ...state, reps: e.target.value })}
          value={state.reps}
        />
      </div>
      <input type="submit" />
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
