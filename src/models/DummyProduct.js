import mongoose from "mongoose";

const dummyproductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const DummyProduct = mongoose.model("dummyproduct", dummyproductSchema);
export default DummyProduct;
