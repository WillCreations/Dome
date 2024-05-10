import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_API_URL;

const useSignup = () => {
  const [signupState, setSignupState] = useState({
    error: null,
    isLoading: false,
  });

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  console.log("url: ", url);

  const signup = async (user) => {
    const { name, email, password } = user;
    setSignupState({ ...signupState, isLoading: true, error: null });
    const response = await fetch(`${url}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setSignupState({ ...signupState, isLoading: false, error: json.error });
    } else {
      localStorage.setItem("session", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setSignupState({ ...signupState, isLoading: false });
      navigate("/", { replace: true });
    }
  };
  return { signup, signupState };
};

export default useSignup;
