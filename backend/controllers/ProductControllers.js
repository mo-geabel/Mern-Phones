import mongoose from "mongoose";
import Product from "../modules/ProductsModule.js";
const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(404)
      .json({ success: false, message: "Please provide all the filed" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(200).json({ success: true, date: newProduct });
  } catch (err) {
    console.error("err in create product:", err.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};
const DeleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "The product doesn't get found" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, date: product });
  } catch (err) {
    console.error("err in deleteing the product:", err.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};
const getall = async (req, res) => {
  const product = await Product.find({}).sort();
  if (product.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "The product doesn't get found" });
  }
  try {
    res
      .status(200)
      .json({ success: true, date: product, message: "get all the items" });
  } catch (err) {
    console.error("err in deleteing the product:", err.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};
const getByid = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "The product doesn't get found" });
  }
  try {
    res
      .status(200)
      .json({ success: true, date: product, message: "get the items" });
  } catch (err) {
    console.error("err in deleteing the product:", err.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};
const UpdateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const product = await Product.findById(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "The product doesn't get found" });
  }
  try {
    const updateProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json({ success: true, date: updateProduct });
  } catch (err) {
    console.error("err in deleteing the product:", err.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export { createProduct, DeleteProduct, getall, getByid, UpdateProduct };
