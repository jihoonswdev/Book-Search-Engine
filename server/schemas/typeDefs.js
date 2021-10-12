const { gql } = require ('apollo-server-repress');

const typeDefs = gql `
    type User {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        savedBooks: [ Book ]
    }

    type Book {
        bookId: ID!
        authors: [String!]
        description: String
        image: String
        link: String
        title: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInput {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Query {
        me: User
    }

`
