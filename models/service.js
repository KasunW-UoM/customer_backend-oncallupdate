const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);
