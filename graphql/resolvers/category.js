const Category = require("../../models/category");

module.exports = {
  categories: async () => {
    try {
      const categories = await Category.find();
      return categories.map((category) => {
        return category;
      });
    } catch (err) {
      throw err;
    }
  },
  createCategory: async (args, req) => {
    const category = new Category({
      name: args.categoryInput.name,
    });
    try {
      const existCategory = await Category.findOne({
        name: args.categoryInput.name,
      });
      if (existCategory) {
        throw new Error("Category Already Exist!");
      }
      const result = await category.save();
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
  deleteCategory: async (args, req) => {
    try {
      const category = await Category.findById(args.categoryId).populate(
        "service"
      );
      await Category.deleteOne({ _id: args.categoryId });
      return category;
    } catch (err) {
      throw err;
    }
  },
};
