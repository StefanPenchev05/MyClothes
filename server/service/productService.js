const Product = require('../model/Product');

module.exports = {
    getRandomProducts: async () => {
        try {
            const products = await Product.find().limit(10);
            if (!products) {
               return new Error("Products not found");
            }
            return products;
        } catch (err) {
            return new Error(err.message);
        }
    },
    addProduct: async (product) => {
        try {
            const newProduct = new Product(product);
            await newProduct.save();
            return newProduct;
        } catch (err) {
            return new Error(err.message);
        }
    }
}