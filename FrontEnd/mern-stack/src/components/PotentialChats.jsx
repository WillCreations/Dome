import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const PotentialChats = ({ pChats, createChat, onlineUsers }) => {
  const { session } = useAuthContext();
  return (
    <div className="potentialChats">
      {pChats.map((p, index) => {
        return (
          <div
            className="pChatBox"
            onClick={() => {
              createChat(session?.user._id, p._id);
            }}
            key={index}
          >
            <span>{p.name}</span>
            <span
              className={
                onlineUsers.some((u) => u?.userId === p._id) ? "onlineDot" : ""
              }
            ></span>
          </div>
        );
      })}
    </div>
  );
};

export default PotentialChats;
