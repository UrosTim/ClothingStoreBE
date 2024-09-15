const express = require("express");
const {getOrders, updateOrderStatus} = require("../handlers/order-handler");
const router = express.Router();
const Order = require('../db/order');

router.get("", async (req, res) => {
    const orders = await getOrders()
    res.send(orders);
});

router.post("/:id", async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    const orders = await updateOrderStatus(id, status);
    res.send({
        message: "Status updated"
    });
});

router.get('/total-sales-per-category', async (req, res) => {
    try {
        const results = await Order.aggregate([
                { $unwind: "$items" },
                {
                    $group: {
                        _id: "$items.product.categoryId",
                        totalSales: {
                            $sum: {
                                $multiply: [
                                    "$items.quantity",
                                    {
                                        $subtract: [
                                            "$items.product.price",
                                            { $multiply: ["$items.product.price", "$items.product.discount", 0.01] }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            ]);

        console.log('Aggregation results:', results); // Log results

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;