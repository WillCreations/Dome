import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useFetchRecepient from "../hooks/useFetchRecepient";
import Message from "./Message";

const ChatBox = ({ sendMessage, messages, currentChat }) => {
  const [input, setInput] = useState("");
  const scroll = useRef();

  const { session } = useAuthContext();

  const { recepientUser } = useFetchRecepient(currentChat, session?.user._id);

  const messenger = (e) => {
    e.preventDefault();
    sendMessage(currentChat, session?.user._id, input, setInput);
  };

  useEffect(() => {
    const scroller = () => {
      scroll.current?.scrollIntoView({
        behavior: "smooth",
      });
    };

    scroller();
  }, [messages]);

  if (!recepientUser?.name) {
    return (
      <div className="noChat">
        <h3>No conversation selected yet...</h3>
      </div>
    );
  } else {
    return (
      <div className="chatRoom">
        <div className="dm">{recepientUser?.name}</div>
        <div className="chatCase">
          <ul className="chatBox">
            {messages.map((message, index) => (
              <Message
                key={index}
                scroll={scroll}
                message={message}
                user={session?.user}
                recepientUser={recepientUser}
              />
            ))}
          </ul>
          <form className="createForm chatForm" onSubmit={messenger}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
};

export default ChatBox;
