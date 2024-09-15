const express = require('express');
const {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../handlers/product-handler");
const router = express.Router();

router.get("", async (req, res) => {
    let result = await getProducts();
    res.send(result);
})

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let result = await getProductById(id);
    res.send(result);
});

router.post('/', async (req, res) => {
    let model = req.body;
    let result = await addProduct(model);
    res.send(result);
});

router.put('/:id', async (req, res) => {
    let model = req.body;
    let id = req.params.id;
    await updateProduct(id, model);
    res.send({message: 'Product updated.'});
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    await deleteProduct(id);
    res.send({message: 'Product deleted.'});
});

module.exports = router;