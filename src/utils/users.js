let users = [];

const addUser = ({ username, id, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!username || !room) return { error: "Username and room are required" };

  const existingUser = users.find(
    (user) => user.username === username && user.room === room
  );
  if (existingUser) {
    return { error: "Username already exists in this room" };
  }

  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  users = users.filter((user) => user.id !== id);
};

const getUser = (id) => {
  const user = users.find((user) => user.id === id);
  return user;
};

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();

  const usersInRoom = users.filter((user) => user.room === room);
  return usersInRoom;
};

module.exports = { addUser, removeUser, getUsersInRoom, getUser };
