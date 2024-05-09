import { createContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { session: action.payload };
    case "LOGOUT":
      return { session: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    session: null,
  });

  useEffect(() => {
    const olduser = JSON.parse(localStorage.getItem("session"));

    if (olduser) {
      dispatch({ type: "LOGIN", payload: olduser });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
