import { useEffect, useState } from "react";
import { getRequest, baseUrl } from "../utils/Services";
import { useChatContext } from "./useChatContext";

const useFetchLatest = (chat) => {
  const { newMessage, notifications, messages } = useChatContext();
  const [latest, setLatest] = useState();

  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(`${baseUrl}/message/${chat?._id}`);

      if (response.error) {
        return console.log("error getting message...", error);
      }
      const lastMessage = response[response?.length - 1];
      setLatest(lastMessage);
    };

    getMessages();
  }, [newMessage, notifications, chat]);
  return latest;
};

export default useFetchLatest;
