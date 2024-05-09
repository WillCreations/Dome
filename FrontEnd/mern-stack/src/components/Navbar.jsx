import React from "react";
import { Link } from "react-router-dom";
import Notification from "./Notification";

import { useAuthContext } from "../hooks/useAuthContext";
import useLogout from "../hooks/uselogout";
const Navbar = () => {
  const { session } = useAuthContext();
  const { logout } = useLogout();

  return (
    <header>
      <div className="container">
        <div>
          <Link to="/">
            <h1>Workout Buddy</h1>
          </Link>
        </div>
        <div className="navigation">
          {session ? (
            <div className="Auth">
              <span className="log">
                <Link to={`/user/${session.user._id}`}>
                  {`${session?.user.name}'s profile`}
                </Link>
              </span>
              <span>
                <Notification />
              </span>
              <span>
                <Link to={`/user/chat/${session.user._id}`}>Chat</Link>
              </span>
              <button
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="Auth">
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/signup">
                {" "}
                <button>Signup</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
