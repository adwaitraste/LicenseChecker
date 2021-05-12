const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/register/', async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    if (user) 
    {
        return res.status(400).send('That user already exisits!');
    } 
    else 
    {
        user = new User(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        );
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    }
});


router.post('/generateLicenseKey/', async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    // Valid User
    user.licenseKey = CryptoJS.MD5(req.body.email);
    await user.save();
    res.send(user);
});

router.post('/verifyLicenseKey/', async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send(false);
    }

    if(req.body.licenseKey != user.licenseKey)
    {
        return res.status(400).send(false);
    }

    res.send(true);
});



module.exports = router;