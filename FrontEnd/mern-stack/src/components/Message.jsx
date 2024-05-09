import React from "react";
import moment from "moment";

const Message = ({ message, scroll, user, recepientUser }) => {
  return (
    <li
      ref={scroll}
      className={`${message?.senderId !== user._id ? "reciever" : "sender"}`}
    >
      <div>
        {message?.senderId !== user._id && (
          <div className="chatHeader">{recepientUser?.name}</div>
        )}
        <div className="chatContent">
          <p>{message.text}</p>
          <span>{moment(message.createdAt).calendar()}</span>
        </div>
      </div>
    </li>
  );
};

export default Message;
