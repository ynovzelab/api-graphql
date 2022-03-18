const User = require ('../../models/user.model');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const configs = require ('../../configs');

module.exports = {
  Query: {
    getUsers () {
      return User.find ();
    },
    getUser (parent, args, context) {
      return User.findById (args.id);
    }
  },
  Mutation: {
  },
};
