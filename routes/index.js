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
        })
        .then(() => {
            res.redirect("http://localhost:5173");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error creating customer profile");
        });
});

router.get('/db', async function(req, res) {
    const users = await CustomerModel.find({});
    console.log(users);
    res.send(users);
  });


module.exports = router;