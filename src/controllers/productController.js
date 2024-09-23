import Product from "../models/ProductModel.js";

// get product by id
export const getProductbyID = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.superAccess) {
      const products = await Product.findById(id);
      return res.status(200).json(products);
    }

    const product = await Product.find({
      _id: id,
      userID: req.user.id,
    });

    if (!product) {
      return res.status(404).json({ msg: "product tidak ditemukan" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get all product
export const getProduct = async (req, res) => {
  try {
    if (req.superAccess) {
      const products = await Product.find();
      return res.status(200).json(products);
    }
    const products = await Product.find({ userID: req.user.id });
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// create product
export const createProduct = async (req, res) => {
  const { name, brand, stock, size, location } = req.body;
  const userId = req.user.id;
  console.log(req.user.id);
  try {
    const product = new Product({
      name: name,
      brand: brand,
      stock: stock,
      size: size,
      location: location,
      userID: userId,
    });
    await product.save();
    res.status(201).json({ msg: "berhasil membuat product" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update product by id
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, brand, stock, size, location } = req.body;
  try {
    const existProduct = await Product.findById(id);
    if (req.superAccess) {
      if (!existProduct) {
        return res.status(404).json({ msg: "product tidak ditemukan" });
      }
      if (name) existProduct.name = name;
      if (brand) existProduct.brand = brand;
      if (stock) existProduct.stock = stock;
      if (size) existProduct.size = size;
      if (location) existProduct.location = location;
      await existProduct.save();
      return res.status(201).josn({ msg: "berhasil diupdate" });
    } else {
      if (req.user.id === existProduct.userID) {
        if (name) existProduct.name = name;
        if (brand) existProduct.brand = brand;
        if (stock) existProduct.stock = stock;
        if (size) existProduct.size = size;
        if (location) existProduct.location = location;
        await existProduct.save();
        return res.status(201).josn({ msg: "berhasil diupdate" });
      }
      return res.status(403).json({ msg: "akses terlarang" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// delete product by id
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.superAccess) {
      await Product.findByIdAndDelete(id);
      return res.status(403).json({ msg: "product berhasil dihapus" });
    }
    const existProduct = await Product.find({
      _id: id,
      userID: req.user.id,
    });
    if (!existProduct) {
      return res.status(404).json({ msg: "product tidak ditemukan" });
    }
    await Product.findByIdAndDelete(id);

    res.status(200).json({ msg: "produck berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
