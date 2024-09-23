import DummyProduct from "../models/DummyProduct.js";

// Get product by ID
export const getProductbyID = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await DummyProduct.findById(id);
    
    if (!product) {
      return res.status(404).json({ msg: "Produk tidak ditemukan" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await DummyProduct.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create product
export const createProduct = async (req, res) => {
  const { name, brand, stock, size, location } = req.body;

  try {
    const product = new DummyProduct({
      name,
      brand,
      stock,
      size,
      location,
    });

    await product.save();
    res.status(201).json({ msg: "Produk berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, brand, stock, size, location } = req.body;

  try {
    const product = await DummyProduct.findByIdAndUpdate(
      id,
      { name, brand, stock, size, location },
      { new: true } // mengembalikan dokumen yang diperbarui
    );

    if (!product) {
      return res.status(404).json({ msg: "Produk tidak ditemukan" });
    }

    res.status(200).json({ msg: "Produk berhasil diperbarui", product });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await DummyProduct.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ msg: "Produk tidak ditemukan" });
    }

    res.status(200).json({ msg: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
