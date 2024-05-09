import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDetails from "./pages/UserDetails";
import Navbar from "./components/Navbar";
import Chat from "./pages/Chat";
import { ChatContextProvider } from "./context/ChatContext.jsx";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { session } = useAuthContext();

  return (
    <ChatContextProvider user={session?.user}>
      <div>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={session?.user ? <Home /> : <Login />} />
            <Route
              path="/login"
              element={!session?.user ? <Login /> : <Home />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/user/chat/:id" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </ChatContextProvider>
  );
};

export default App;
