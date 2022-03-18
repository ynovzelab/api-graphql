const express = require("express");
const config = require("../configs");
const cors = require("cors");
const port = config.server.port;
const { ApolloServer, gql } = require("apollo-server-express");

const ProductSchema = require("../apollo/schemas/product.schema");
const UserSchema = require("../apollo/schemas/user.schema");

const productResolvers = require("../apollo/resolvers/product.resolver");
const userResolvers = require("../apollo/resolvers/user.resolver");

const app = express();

const graphQlServer = new ApolloServer({
  typeDefs: [ProductSchema, UserSchema],
  resolvers: [productResolvers, userResolvers],
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
