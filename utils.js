const users = [];

exports.joinUser = (id, nickname, room) => {
  const user = { id, nickname, room };
  users.push(user);
  return user;
};

exports.getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};
