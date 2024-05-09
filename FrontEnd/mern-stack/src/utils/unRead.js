export const unRead = (notifications) => {
  return notifications.filter((n) => n?.isRead === false);
};

export const modify = (notifications, users) => {
  return notifications.map((n) => {
    const sender = users?.find((user) => user?._id === n?.senderId);
    return {
      ...n,
      senderName: sender?.name,
    };
  });
};

export const UniqueNote = (notes, recepientUser) => {
  const response = notes.filter((n) => {
    return n.senderId === recepientUser?._id;
  });
  return response;
};

export const shorten = (text) => {
  let shortText = text.substring(0, 15);
  if (text.length > 15) {
    return `${shortText} ...`;
  } else {
    return text;
  }
};
