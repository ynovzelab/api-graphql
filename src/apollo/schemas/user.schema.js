const { gql } = require('apollo-server-express');

module.exports = gql`
    type User {
        id: ID
        firstName: String
        lastName: String
        password: String
        email: String
        isAdmin: Boolean
        wishlist:[Product]
    }
    input userInput {
        firstName: String
        lastName: String
        password: String
        email: String
        wishlist:[ID]
    }
    type Authorization {
        auth: Boolean
        jwt:String
    }
    extend type Query {
        getUser(id:ID): User
        getUsers:[User]
        getMe:User
    }
    extend type Mutation {
        updateUser(id:ID, userInput: userInput):User
        registerUser(userInput:userInput):Authorization
        login(userInput:userInput):Authorization
    }
`