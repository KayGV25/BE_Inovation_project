const express = require('express');
const router = express.Router();
const CustomerModel = require('../models/customer');


router.post('/new-customer', function(req, res) {

    let { name, address, email, phone, productQuantity } = req.body;
    
    let currentTime = new Date();
    
    let newCustomer = new CustomerModel({
        name: name,
        address: address,
        email: email,
        phone: phone,
        productQuantity: productQuantity,
        orderTime: currentTime
    });

    
    newCustomer.save()
        .then(() => {
            console.log("New customer profile is created");
            res.send("Customer profile created successfully");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error creating customer profile");
        });
});

module.exports = router;