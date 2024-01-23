const productService = require('../service/productService');

module.exports = {
    getRandomProducts: async (req, res) => {
        try {
            const products = await productService.getRandomProducts();
            if (!products) {
                return res.status(404).json({ message: "Products not found" });
            }
            return res.status(200).json(products);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    addProduct: async (req, res) => {
        try {
            const product = await productService.addProduct(req.body);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(200).json(product);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}