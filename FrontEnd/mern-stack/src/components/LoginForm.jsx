import { useState } from "react";
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
  const { login, LoginState } = useLogin();
  const { error, isLoading } = LoginState;

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("state: ", state);
    const user = {
      email: state.email,
      password: state.password,
    };

    await login(user);
  };

  return (
    <form className="createForm" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div>
        <label htmlFor="">Email</label>
        <input
          type="text"
          onChange={(e) => setState({ ...state, email: e.target.value })}
          value={state.email}
        />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input
          type="password"
          onChange={(e) => setState({ ...state, password: e.target.value })}
          value={state.password}
        />
      </div>

      <input disabled={isLoading} type="submit" />
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LoginForm;
