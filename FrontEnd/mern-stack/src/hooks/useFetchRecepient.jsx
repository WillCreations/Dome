import React, { useEffect, useState } from "react";
import { getRequest, baseUrl } from "../utils/Services";

const useFetchRecepient = (chat, user) => {
  const [recepientUser, setRecepientUser] = useState();
  const [error, setError] = useState();

  const recepientId = chat?.members.find((u) => {
    return u !== user;
  });

  useEffect(() => {
    const getRecepientUser = async () => {
      const response = await getRequest(`${baseUrl}/user/${recepientId}`);

      if (response.error) {
        console.log("no potential chat");
      }
      if (!response.error) {
        setError(response.error);
      }

      setRecepientUser(response);
    };

    getRecepientUser();
  }, [recepientId]);

  return { recepientUser };
};

export default useFetchRecepient;
