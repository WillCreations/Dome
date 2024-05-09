import React from "react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { getRequest, baseUrl } from "../utils/Services";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { session } = useAuthContext();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetcher = async () => {
      const response = await getRequest(`${baseUrl}/workouts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      });

      if (response.error) {
        setError(response);
      } else {
        dispatch({ type: "SET_WORKOUTS", payload: response });
      }
    };

    fetcher();
  }, [dispatch, session]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts ? (
          workouts.map((workout) => {
            return (
              <div key={workout._id} className="single">
                <Card workout={workout} session={session} />
              </div>
            );
          })
        ) : (
          <div className="single">
            <p>No Workouts</p>
          </div>
        )}
      </div>

      <WorkoutForm />
    </div>
  );
};

export default Home;
