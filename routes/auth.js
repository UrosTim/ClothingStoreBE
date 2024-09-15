const express = require('express');
const {registerUser, loginUser} = require("../handlers/auth-handler");
const router = express.Router();

router.post('/login', async (req, res) => {
    let model = req.body;
    if (model.email && model.password) {
        const result = await loginUser(model);
        if (result) {
            res.send(result);
        } else {
            res.status(401).send({message: 'Invalid Credentials'});
        }
    } else {
        res.status(401).send({message: 'Invalid Credentials'});
    }
});

router.post('/register', async (req, res) => {
    let model = req.body;
    if (model.name && model.email && model.password) {
        await registerUser(model);
        res.status(200).send({
            message: 'User registered successfully.'
        });
    } else {
        res.status(401).json({error: 'Invalid Credentials'});
    }
});

module.exports = router;