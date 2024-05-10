import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_API_URL;

const useLogin = () => {
  const [LoginState, setLoginState] = useState({
    error: "",
    isLoading: false,
  });

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (user) => {
    const { email, password } = user;
    setLoginState({ ...LoginState, isLoading: true, error: null });
    const response = await fetch(`${url}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoginState({ ...LoginState, isLoading: false, error: json.error });
    } else {
      localStorage.setItem("session", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoginState({ ...LoginState, isLoading: false });
      navigate("/", { replace: true });
    }
  };
  return { login, LoginState };
};

export default useLogin;
