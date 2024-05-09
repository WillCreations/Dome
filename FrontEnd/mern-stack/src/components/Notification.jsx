import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useChatContext } from "../hooks/useChatContext";
import { unRead, modify } from "../utils/unRead";
import moment from "moment";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useAuthContext();
  const { notifications, userChats, allUsers, markAsRead, markOne } =
    useChatContext();

  const unread = unRead(notifications);
  const modified = modify(notifications, allUsers);

  return (
    <div className="notifications">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="Notify"
      >
        {unread?.length === 0 ? null : <span>{unread?.length}</span>}
      </div>
      {isOpen && (
        <div className="notificationsBox">
          <div className="notificationsHeader">
            <h3>Notifications</h3>
            <div
              onClick={() => {
                markAsRead(notifications);
              }}
              className="markRead"
            >
              <p>Mark as read</p>
            </div>
          </div>
          {modified?.length === 0 ? (
            <div>
              <span className="note">No notifications yet...</span>
            </div>
          ) : null}
          {modified &&
            modified.map((m, index) => {
              return (
                <div>
                  <div
                    onClick={() => {
                      markOne(m, userChats, session?.user, notifications);
                      setIsOpen(false);
                    }}
                    className={m.isRead ? "note" : "unreadNote"}
                  >
                    <span>{`${m.senderName} sent you a message...`}</span>
                    <span>{moment(m.date).calendar()}</span>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Notification;
