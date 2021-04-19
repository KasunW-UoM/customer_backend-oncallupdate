const Location = require("../../models/location");
const { transformLocation } = require("./merge");
const Service = require("../../models/service");

module.exports = {
  locations: async () => {
    try {
      const locations = await Location.find();
      return locations.map((location) => {
        return transformLocation(location);
      });
    } catch (err) {
      throw err;
    }
  },
  createLocation: async (args, req) => {
    const location = new Location({
      name: args.locationInput.name,
    });
    try {
      const existLocation = await Location.findOne({
        name: args.locationInput.name,
      });
      if (existLocation) {
        throw new Error("Location Already Exist!");
      }
      const result = await location.save();
      //   const services = await Service.find({
      //     location: args.locationInput.name,
      //   });

      //   console.log(services);

      //   if (!creator) {
      //     throw new Error("User not found.");
      //   }
      //   creator.createdServices.push(service);
      //   await creator.save();

      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  deleteLocation: async (args, req) => {
    try {
      const location = await Location.findById(args.locationId).populate(
        "service"
      );
      await Location.deleteOne({ _id: args.locationId });
      return location;
    } catch (err) {
      throw err;
    }
  },
};
