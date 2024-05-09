import { useState } from "react";
import useSignup from "../hooks/useSignup";

const SignupForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { signup, signupState } = useSignup();
  const { error, isLoading } = signupState;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("state: ", state);
    const user = {
      name: state.name,
      email: state.email,
      password: state.password,
    };

    await signup(user);
  };

  return (
    <form className="createForm" onSubmit={handleSubmit}>
      <h3>Signup</h3>
      <div>
        <label htmlFor="">Username</label>
        <input
          type="text"
          onChange={(e) => setState({ ...state, name: e.target.value })}
          value={state.name}
        />
      </div>
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

export default SignupForm;
