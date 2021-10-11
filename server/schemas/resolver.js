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

  mutation: {
    addUser: async function (parent, args) {},

    login: async function (parent, { email, password }) {
      // find the User with input email
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError ('Incorrect Credential');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError ('Incorrect Password');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async function (parent, {bookData}, context) {
        if (context.user) {
            // TODO: args.book

        }

    },

    // doesnt matter if you write deleteBook or removeBook!
    removeBook: async function (parent, args, context) {
        // TODO: args.bookId
        
    }
    
  },
};

module.exports = resolvers;
