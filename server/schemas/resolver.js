const { AuthenticationError } = require ('apollo-server-express');
const { Users } = require ( '../models' );
const { signToken } = require ( '../utils/auth' );

const resolvers = {
    Query: {
        me: async function (parent, args, context) {
            if (context.user._id) {
                const userData = await User.findOne({
                    _id: context.user._id
                }).select('-__v -password'); // dont need password

                return userData;
            }

            throw new AuthenticationError('Not logged in!');
        }
    },

    mutation: {}
}





module.exports = resolvers;