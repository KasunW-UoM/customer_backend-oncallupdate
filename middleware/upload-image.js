const fs = require("fs");

module.exports = async function (req, res, next) {
  try {
    // console.log(req);
  } catch (err) {
    console.log(err);
  }

  next();
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
