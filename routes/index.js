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
        orderTime: currentTime,
        status: 0,
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
    res.send(users);
  });

router.post('/delete', async function(req, res){
    const {id} = req.body;
    await CustomerModel.findByIdAndDelete(id);
    res.sendStatus(200);
});

router.post('/updateStatus/OnTheWay', async function(req,res){
    const {id} = req.body;
    await CustomerModel.findByIdAndUpdate(id, {status: 1});
    res.sendStatus(200);
})
router.post('/updateStatus/Delivered', async function(req,res){
    const {id} = req.body;
    await CustomerModel.findByIdAndUpdate(id, {status: 2});
    res.sendStatus(200);
})
module.exports = router;