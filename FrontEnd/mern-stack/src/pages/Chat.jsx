import { useChatContext } from "../hooks/useChatContext";
import UserChats from "../components/UserChats";
import PotentialChats from "../components/potentialChats";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  const {
    userChats,
    potentialChats,
    createChat,
    updateCurrentChat,
    messages,
    currentChat,
    sendMessage,
    onlineUsers,
    notifications,
    markUserRead,
  } = useChatContext();

  return (
    <div>
      {
        <PotentialChats
          pChats={potentialChats}
          onlineUsers={onlineUsers}
          createChat={createChat}
        />
      }
      <div className="chatContainer">
        <div className="chatPage">
          <div className="chatList">
            {userChats.map((chat, index) => {
              return (
                <div
                  className="chat"
                  onClick={() => {
                    updateCurrentChat(chat);
                  }}
                  key={index}
                >
                  <UserChats
                    chat={chat}
                    onlineUsers={onlineUsers}
                    notifications={notifications}
                    markUserRead={markUserRead}
                  />
                </div>
              );
            })}
          </div>
          <ChatBox
            sendMessage={sendMessage}
            messages={messages}
            currentChat={currentChat}
            onlineUsers={onlineUsers}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
