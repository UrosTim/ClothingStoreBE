const Product = require('../db/product');

async function getProducts() {
    let products =await Product.find();
    return products.map((p) => p.toObject());
}

async function getProductById(id) {
    let product =await Product.findById(id);
    return product.toObject();
}

async function addProduct(model) {
    let product = new Product({
        ...model
    });
    await product.save();
    return product.toObject();
}

async function updateProduct(id, model) {
    await Product.findByIdAndUpdate(id, model);
}

async function deleteProduct(id) {
    await Product.findByIdAndDelete(id);
}

async function getNewProducts() {
    let newProducts = await Product.find({
        isFresh: true,
    }).limit(4);
    return newProducts.map((np) => np.toObject());
}
async function getFeaturedProducts() {
    let featuredProducts = await Product.find({
        isFeatured: true,
    }).limit(5);
    return featuredProducts.map((np) => np.toObject());
}

async function getProductForListing(searchTerm, categoryId, brandId, pageNumber, pageSize, sortBy, sortOrder) {
    if (sortBy) {
        sortBy = 'price'
    }
    if (!sortOrder) {
        sortOrder = -1;
    }
    let queryFilter = {};
    if (searchTerm) {
        queryFilter.$or = [
            {
                name : { $regex: ".*" + searchTerm+ ".*" },
            },
            {
                shortDescription : {$regex: '.*'+searchTerm+'.*'},
            },
        ];
    }
    if (categoryId) {
        queryFilter.categoryId = categoryId;
    }
    if (brandId) {
        queryFilter.brandId = brandId;
    }
    const products = await Product.find(queryFilter).sort({
        [sortBy]: +sortOrder,
    }).skip((+pageNumber - 1) * +pageSize).limit(+pageSize);
    return products.map(p => p.toObject());
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getNewProducts,
    getFeaturedProducts,
    getProductForListing,
}