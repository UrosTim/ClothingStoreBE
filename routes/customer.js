const express = require('express');
const {
    getNewProducts,
    getFeaturedProducts,
    getProductForListing,
    getProductById
} = require("../handlers/product-handler");
const {getCategories, getCategoryById} = require("../handlers/category-handler");
const {getBrands, getBrandById} = require("../handlers/brand-handler");
const {getWishlist, addToWishList, removeFromWishlist} = require("../handlers/wishlist-handler");
const {getCartItems, addToCart, removeFromCart, clearCart} = require("../handlers/cart-handler");
const {response} = require("express");
const {addOrder, getCustomerOrders} = require("../handlers/order-handler");
const router = express.Router();

router.get("/new-products", async (req, res) => {
    let result = await getNewProducts();
    res.send(result);
});

router.get("/featured-products", async (req, res) => {
    let result = await getFeaturedProducts();
    res.send(result);
});

router.get("/categories", async (req, res) => {
    let result = await getCategories();
    res.send(result);
});

router.get("/brands", async (req, res) => {
    let result = await getBrands();
    res.send(result);
});

router.get("/products", async (req, res) => {
    const {searchTerm, categoryId, brandId, pageNumber, pageSize, sortBy, sortOrder} = req.query;
    const result = await getProductForListing(searchTerm, categoryId, brandId, pageNumber, pageSize, sortBy, sortOrder);
    res.send(result);
});

router.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    const product = await getProductById(id);
    res.send(product);
});

router.get('/brand/:id', async (req, res) => {
    const id = req.params.id;
    const brand = await getBrandById(id);
    res.send(brand);
});

router.get('/category/:id', async (req, res) => {
    const id = req.params.id;
    const category = await getCategoryById(id);
    res.send(category);
});

router.get('/wishlists', async (req, res) => {
    const userId = req.user.id;
    const items = await getWishlist(userId)
    res.send({
        items
    });
});

router.post('/wishlists/:id', async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    const item = await addToWishList(userId, productId);
    res.send(item);
});

router.delete('/wishlists/:id', async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    await removeFromWishlist(userId, productId);
    res.send({
        message: "Removed successfully."
    });
});

router.get('/cart', async (req, res) => {
    const userId = req.user.id;
    const items = await getCartItems(userId);
    res.send(items);
})

router.post('/cart/:id', async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    const quantity = req.body.quantity;
    const items = await addToCart(userId, productId, quantity);
    res.send(items);
})
router.delete('/cart/:id', async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    const items = await removeFromCart(userId, productId);
    res.send(items);
})

router.post("/order", async (req, res) => {
    const userId = req.user.id;
    const order = req.body;
    await addOrder(userId, order);
    await clearCart(userId);
    return res.send({
        message: "Order created."
    })
})

router.get('/orders', async (req, res) => {
    const userId = req.user.id;
    const orders = await getCustomerOrders(userId);
    return res.send(orders)
})

module.exports = router;