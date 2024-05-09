import { useAuthContext } from "./useAuthContext";
import {useWorkoutsContext } from "./useWorkoutContext"
import {useNavigate} from "react-router-dom"

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: WorkoutsDispatch} = useWorkoutsContext()
  const navigate = useNavigate()

  const logout = () => {
    // remove use from storage
    localStorage.removeItem("session");
    // fire dispatch logout action
    dispatch({ type: "LOGOUT" });
     WorkoutsDispatch({type: "SET_WORKOUTS", payload: null})
    navigate("/login", {replace: true})
  };
  return { logout };
};

export default useLogout;
