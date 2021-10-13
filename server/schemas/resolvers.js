const { AuthenticationError } = require("apollo-server-express");
const { Users } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async function (parent, args, context) {
      if (context.user._id) {
        const userData = await User.findOne({
          _id: context.user._id,
        }).select("-__v -password"); // dont need password (google: mongoose versionKey)

        return userData;
      }

      throw new AuthenticationError("Not logged in!");
    },
  },

  Mutation: {
    addUser: async function (parent, args) {
        console.log("addUser: args: ", args);
        // TODO:


        // return /* TODO: data to return */
    },

    login: async function (parent, { email, password }) {
        // console.log("args: ", args);
        console.log("login: email: ", email, " password: ", password);
        const user = await User.findOne({ email });
        if (!user) {
            throw new AuthenticationError('Incorrect Credentials');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('Incorrect Credentials');
        }
        const token = signToken(user);
        return { token, user };
    },

    saveBook: async function (parent, { bookData }, context) {
        // console.log("args",  args);
        if (context.user) {
            // TODO:

            // return /* TODO: data to return */;
        }

        throw new AuthenticationError('You need to be logged in!');

    },

    removeBook: async function (parent, args, context) {
        console.log("args: ", args);
        console.log(`context: ${context}`);
        if (context.user) {
            // ToODO:
            // args.bookId?


            // return /* TODO: data to return */;
        }

        throw new AuthenticationError('You need to be logged in!');

    }
}
}

module.exports = resolvers;

