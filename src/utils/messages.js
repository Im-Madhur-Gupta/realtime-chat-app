const generateMessage = (text, username) => {
  return {
    text,
    createdAt: new Date().getTime(),
    sourceUsername: username,
  };
};

const generateLocationMessage = (url, username) => {
  return {
    url,
    createdAt: new Date().getTime(),
    sourceUsername: username,
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage,
};
