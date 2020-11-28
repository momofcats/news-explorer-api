const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'error' }));
};

const getUserInfo = (req, res) => {
  let userId = req.params.id;
  if (userId === 'me') {
    userId = req.user._id;
  }
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: 'No user with matching ID found' });
      }
      return res.status(200).send(user);
    })
    .catch();
};

module.exports = {
  getUsers,
  getUserInfo,
};
