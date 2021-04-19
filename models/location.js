const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
});

module.exports = mongoose.model("Location", locationSchema);
