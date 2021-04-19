const authResolver = require("./auth");
// const eventsResolver = require('./events');
const servicesResolver = require("./services");
const orderResolvers = require("./orders");
const locationResolver = require("./locations");
const categoryResolver = require("./category");

const rootResolver = {
  ...authResolver,
  // ...eventsResolver,
  ...categoryResolver,
  ...locationResolver,
  ...servicesResolver,
  ...orderResolvers,
};

module.exports = rootResolver;
