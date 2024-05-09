import useFetchRecepient from "../hooks/useFetchRecepient";
import { useAuthContext } from "../hooks/useAuthContext";
import { unRead, UniqueNote, shorten } from "../utils/unRead";
import useFetchLatest from "../hooks/useFetchLatest";
import moment from "moment";
import { useEffect, useState } from "react";

const UserChats = ({ chat, onlineUsers, notifications, markUserRead }) => {
  const { session } = useAuthContext();
  const { recepientUser } = useFetchRecepient(chat, session?.user._id);
  const unread = unRead(notifications);
  const uniqueNote = UniqueNote(unread, recepientUser);

  const latest = useFetchLatest(chat);

  return (
    <div
      onClick={() => {
        markUserRead(uniqueNote, notifications);
      }}
    >
      <div className="pChatBox">
        <div className="topChat">
          <div className="chatName">
            <span>{recepientUser?.name}</span>
          </div>
          {latest && (
            <div>
              <div className="chatDate">
                {moment(latest?.createdAt).calendar()}
              </div>
            </div>
          )}
        </div>
        <span
          className={
            onlineUsers.some((u) => u?.userId === recepientUser?._id)
              ? "onlineDotC"
              : ""
          }
        ></span>
      </div>
      <div className="topChat">
        {latest && (
          <div className="chatInfo">
            <div>{shorten(latest?.text)}</div>
          </div>
        )}
        {uniqueNote?.length !== 0 ? (
          <div>
            <span className="NoteAlert">{uniqueNote?.length}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserChats;
