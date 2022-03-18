const { gql } = require('apollo-server-express');

module.exports = gql`
    type User {
        id: ID
        firstName: String
        lastName: String
        password: String
        email: String
        isAdmin: Boolean
    }
    extend type Query {
        getUser(id:ID): User
        getUsers:[User]
    }
`