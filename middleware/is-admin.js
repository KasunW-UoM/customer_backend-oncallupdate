const User = require("../models/user");

const authAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (user) {
      const findUserType = user.type;
      if (findUserType === "ADMIN") {
        req.isAdmin = true;
        return next();
      }
    }

    req.isAdmin = false;
    next();
  } catch (error) {
    throw error;
  }
};

module.exports = authAdmin;
