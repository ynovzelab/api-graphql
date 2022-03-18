const express = require("express");
const config = require("../configs");
const cors = require("cors");
const port = config.server.port;
const { ApolloServer, gql } = require("apollo-server-express");
const jwt = require ('jsonwebtoken');

const ProductSchema = require("../apollo/schemas/product.schema");
const UserSchema = require("../apollo/schemas/user.schema");

const productResolvers = require("../apollo/resolvers/product.resolver");
const userResolvers = require("../apollo/resolvers/user.resolver");

const app = express();

const graphQlServer = new ApolloServer({
  typeDefs: [ProductSchema, UserSchema],
  resolvers: [productResolvers, userResolvers],
  context: ({req}) => {
    const token = req.headers.authorization;
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return {
          auth: true,
          userId: decodedToken.id
        }
      }
      catch (err) {
        return {
          auth: false,
          token: null,
          message:"not authorized"
        }
      }
    }
    else {
      return {
        auth: false,
          token: null,
          message:"missing token"
      }
    }
  }
});

graphQlServer.applyMiddleware({ app, path: "/graphql" });
app.use(cors());

exports.start = () => {
  app.listen(port, (err) => {
    if (err) {
      console.log(`Errors: ${err}`);
      process.exit(-1);
    }
    console.log(`app is runnning on port ${port}`);
  });
};
