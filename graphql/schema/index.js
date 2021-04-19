const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Order {
    _id: ID!
    service: Service!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Location {
  _id: ID!
  name: String!
  services: [Service!]
}

type Service {
  _id: ID!
  title: String!
  category: Category!
  description: String!
  imageUrl: String!
  price: Float!
  date: String!
  location: Location!
  creator: User!
  createdAt: String!
  updatedAt: String!
}


type Category {
  _id: ID!
  name: String!
}

type User {
  _id: ID!
  firstName: String!
  lastName: String!
  username: String!
  email: String!
  password: String
  type: String
  createdServices: [Service!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
  type: String
}

input ServiceInput {
  title: String!
  description: String!
  category: String!
  price: Float!
  date: String!
  location: String!
  imageUrl: String!
}

input LocationInput {
  name: String!
}

input CategoryInput {
  name: String!
}

input UserInput {
  username: String!
  email: String!
  firstName: String!
  lastName: String!
  password: String!
  type: String
}

type RootQuery {
    services: [Service!]!
    categories: [Category!]
    locations: [Location!]!
    orders: [Order!]!
    getService(serviceId: ID!): Service!
    getAllUsers: [User!]!
    getUser: User!

}

type RootMutation {
    createCategory(categoryInput: CategoryInput): Category
    createLocation(locationInput: LocationInput): Location
    createService(serviceInput: ServiceInput): Service
    createUser(userInput: UserInput): User
    orderService(serviceId: ID!): Order!
    cancelOrder(orderId: ID!): Service!
    deleteLocation(locationId: ID!): Location!
    deleteCategory(categoryId: ID!): Category!
    login(email: String!, password: String!): AuthData!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
