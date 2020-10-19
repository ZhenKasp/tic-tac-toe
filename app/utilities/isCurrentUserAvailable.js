isCurrentUserAvailable = (users, email) => {
  index = users.findIndex(x => x.email === email);
  return (users[index] && users[index].status === "active");
};

module.exports = isCurrentUserAvailable;