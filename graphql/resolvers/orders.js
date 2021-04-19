const Service = require("../../models/service");
const Order = require("../../models/order");
const { transformOrder, transformService } = require("./merge");

module.exports = {
  orders: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const orders = await Order.find({ user: req.userId });
      return orders.map((order) => {
        return transformOrder(order);
      });
    } catch (err) {
      throw err;
    }
  },
  orderService: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const fethcService = await Service.findOne({ _id: args.serviceId });
    const order = new Order({
      user: req.userId,
      service: fethcService,
    });
    const result = await order.save();
    const transform = transformOrder(result);
    // console.log(transform);
    return transformOrder(result);
  },
  cancelOrder: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const order = await Order.findById(args.orderId).populate("service");
      const service = transformService(order.service);
      await Order.deleteOne({ _id: args.orderId });
      return service;
    } catch (err) {
      throw err;
    }
  },
};
