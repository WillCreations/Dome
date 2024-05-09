import React from "react";

export const baseUrl = "http://localhost:4000/api";

export const PostRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }

    return { error: true, message };
  }
  return data;
};

export const getRequest = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    let message = "an error occured";
    if (data?.message) {
      message = data.message;
    }

    return { error: true, message };
  }

  return data;
};
