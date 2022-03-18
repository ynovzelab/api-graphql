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
    },
    getMe(parent, args, context) {
      console.log(context);
      return User.findById(context.userId);
    }
  },
  Mutation: {
    updateUser (parent, args) {
      return User.findByIdAndUpdate (args.id, args.userInput, {
        new: true,
      }).populate ('wishlist');
    },
    async registerUser (parent, args) {
      try {
        let hashedPassword = bcrypt.hashSync (args.userInput.password, 10);

        const user = new User ({
          firstName: args.userInput.firstName,
          lastName: args.userInput.lastName,
          email: args.userInput.email,
          isAdmin: false,
          password: hashedPassword,
        });

        const savedUser = await user.save ();
        console.log (savedUser);
        if (savedUser) {
          let userToken = jwt.sign (
            {
              id: savedUser._id,
              isAdmin: savedUser.isAdmin,
            },
            configs.jwt.secret,
            {
              expiresIn: 86400,
            }
          );
          return {
            auth: true,
            jwt: userToken,
            
          };
        }
      } catch (error) {
        console.log(error);
        //  return {
        //     auth: false,
        //     jwt: null,
        //     message:error
        //   }
      }
    },
  },
};
