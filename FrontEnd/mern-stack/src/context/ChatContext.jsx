import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, PostRequest, getRequest } from "../utils/Services";
import io from "socket.io-client";

const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [potentialChats, setPotentialChats] = useState([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [MessageError, setMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:4500");
    setSocket(newSocket);
    newSocket.on("connection", (message) => {
      console.log(message);
    });
    // Listen for incoming messages from the server
    newSocket.on("sendback", (message) => {
      console.log("message: ", message);

      // setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Clean up the socket connection when the component unmounts

      newSocket.disconnect();
    };
  }, [user]);

  //add new user

  useEffect(() => {
    if (socket === null) return;

    socket.emit("addNewUser", user?._id);
    // Listen for incoming messages from the server
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  //send message

  useEffect(() => {
    if (socket === null) return;
    const recepientId = currentChat?.members.find((u) => {
      return u !== user?._id;
    });

    socket.emit("sendMessage", { ...newMessage, recepientId });

    return () => {};
  }, [newMessage]);

  // recieve message and notification
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (message) => {
      if (currentChat?._id !== message.chatId) return;
      setMessages((prev) => [...prev, message]);
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some((id) => {
        return id === res.senderId;
      });

      console.log("isChatOpen", isChatOpen);

      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat]);

  //get all user and query fro potential chats
  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/user`);

      if (response.error) {
        console.log("no potential chat");
      }

      setAllUsers(response);

      const pChats = response.filter((u) => {
        if (user?._id === u._id) {
          return false;
        }

        if (userChats.length !== 0) {
          const isChatCreated = userChats.some((chat) => {
            return chat.members[1] === u._id || chat.members[0] === u._id;
          });
          return !isChatCreated;
        }

        return true;
      });

      setPotentialChats(pChats);
    };

    getUsers();
  }, [userChats]);

  // userChats websocket update

  useEffect(() => {
    if (socket === null) return;

    socket.emit("updateChat", { userChats, user });

    return () => {
      socket.off("updateChat");
    };
  }, [messages]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("updateChat", (chat) => {
      const update = userChats.find((c) => c._id === chat._id);

      if (update) {
        const result = userChats.filter((c) => c._id !== update._id);
        setUserChats((prev) => [update, ...result]);
      }
    });

    return () => {
      socket.off("updateChat");
    };
  }, [socket]);

  //gets the chats of a user in session
  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        const response = await getRequest(`${baseUrl}/chat/${user._id}`);
        setIsUserChatsLoading(false);
        if (response.error) {
          return setUserChatsError(response);
        }
        setUserChats(response);
      }
    };
    getUserChats();
  }, [user, messages]);

  //updates the current chat in preparation to display messages
  const updateCurrentChat = (chat) => {
    setCurrentChat(chat);
  };

  //gets all message of a single chat
  useEffect(() => {
    const getMessages = async () => {
      if (user?._id) {
        setIsMessageLoading(true);
        setMessageError(null);
        const response = await getRequest(
          `${baseUrl}/message/${currentChat?._id}`
        );
        setIsMessageLoading(false);
        if (response.error) {
          return setMessageError(response);
        }
        setMessages(response);
      }
    };
    getMessages();
  }, [currentChat]);

  //creates a new chat between the session user and another user
  const createChat = async (userOne, userTwo) => {
    const response = await PostRequest(
      `${baseUrl}/chat`,
      JSON.stringify({ userOne, userTwo })
    );
    if (response.error) {
      return console.log("errror");
    }

    setUserChats([...userChats, response]);
  };

  const sendMessage = async (chatId, senderId, text, setMess) => {
    if (!text) return console.log("you must send a message...");
    const response = await PostRequest(
      `${baseUrl}/message`,
      JSON.stringify({
        chatId,
        senderId,
        text,
      })
    );
    setMessages((prev) => [...prev, response]);
    setNewMessage(response);
    setMess("");
  };

  const markAsRead = (notes) => {
    const modNotes = notes.map((n) => {
      return {
        ...n,
        isRead: true,
      };
    });
    setNotifications(modNotes);
  };

  const markOne = (n, userChats, user, notes) => {
    //find chat to open
    const targetChat = userChats.find((chat) => {
      const chatmembers = [user._id, n.senderId];
      const isTargetChat = chat?.members.every((member) => {
        return chatmembers.includes(member);
      });

      return isTargetChat;
    });

    const modNotes = notes.map((urn) => {
      if (n.senderId === urn?.senderId) {
        return {
          ...n,
          isRead: true,
        };
      } else {
        return urn;
      }
    });

    setNotifications(modNotes);

    updateCurrentChat(targetChat);
  };

  const markUserRead = (userNotes, notes) => {
    const modNotes = notes.map((urn) => {
      let note;
      userNotes.forEach((n) => {
        if (n.senderId === urn.senderId) {
          note = {
            ...n,
            isRead: true,
          };
        } else {
          note = urn;
        }
      });

      return note;
    });

    setNotifications(modNotes);
  };

  const context = {
    userChats,
    isUserChatsLoading,
    userChatsError,
    potentialChats,
    isMessageLoading,
    setMessages,
    MessageError,
    createChat,
    updateCurrentChat,
    currentChat,
    sendMessage,
    onlineUsers,
    notifications,
    allUsers,
    markAsRead,
    markOne,
    markUserRead,
    messages,
  };

  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
};

export default ChatContext;
