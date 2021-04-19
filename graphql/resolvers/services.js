const Service = require("../../models/service");
const User = require("../../models/user");
const Location = require("../../models/location");
const Category = require("../../models/category");
const { transformService } = require("./merge");

module.exports = {
  services: async () => {
    try {
      const services = await Service.find();
      return services.map((service) => {
        return transformService(service);
      });
    } catch (err) {
      throw err;
    }
  },
  getService: async (args) => {
    try {
      const service = await Service.findOne({ _id: args.serviceId });
      return transformService(service);
    } catch (err) {
      throw err;
    }
  },
  createService: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const getLocation = await Location.findOne({
      name: args.serviceInput.location,
    });

    const getCategory = await Category.findOne({
      name: args.serviceInput.category,
    });

    const service = new Service({
      title: args.serviceInput.title,
      description: args.serviceInput.description,
      price: +args.serviceInput.price,
      date: new Date(args.serviceInput.date),
      creator: req.userId,
      category: getCategory.id,
      location: getLocation.id,
      imageUrl: args.serviceInput.imageUrl,
    });
    let createdService;
    try {
      const result = await service.save();
      createdService = transformService(result);
      const serviceLocation = await Location.findById(getLocation.id);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error("User not found.");
      }
      // console.log(serviceLocation);
      creator.createdServices.push(service);
      serviceLocation.services.push(service);

      await serviceLocation.save();
      await creator.save();

      return createdService;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
