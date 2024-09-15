const User = require('../db/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(model) {
    const hashedPassword = await bcrypt.hash(model.password, 13);
    let user = new User({
        name: model.name,
        email: model.email,
        password: hashedPassword,
    });
    await user.save();
}

async function loginUser(model) {
    const user = await User.findOne({email:model.email});
    if (user) {
        const passwordMatched = await bcrypt.compare(model.password, user.password);
        if (passwordMatched) {
            const token = jwt.sign({
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            }, "secret", {
                expiresIn: "2h",
            });
            return { token, user };
        } else {
            return null;
        }
    } else {
        return null;
    }
}

module.exports = { registerUser, loginUser };