const express = require('express');
const router = express.Router();
const CustomerModel = require('../models/customer');


router.post('/new-customer', function(req, res) {

    let { name, address, email, phone, productQuantity } = req.body;
    
    let currentTime = new Date();
    
    let newCustomer = new CustomerModel({
        name: name.toLowerCase(),
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
            res.redirect("back");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error creating customer profile");
        });
        var datetime = new Date();
        console.log("\x1b[92m" + datetime.toLocaleString('vi-VN') + "\x1b[37m");
});

router.get('/db', async function(req, res) {
    const users = await CustomerModel.find({});
    var datetime = new Date();
    console.log("\x1b[92m" + datetime.toLocaleString('vi-VN') + "\x1b[37m");
    res.send(users);
  });

router.post('/delete', async function(req, res){
    const {id} = req.body;
    await CustomerModel.findByIdAndDelete(id);
    var datetime = new Date();
    console.log("\x1b[92m" + datetime.toLocaleString('vi-VN') + "\x1b[37m");
    res.sendStatus(200);
});

router.post('/getByPhone', async function(req, res) {
    const {name} = req.body;
    if(name == "*") users = await CustomerModel.find();
    else users = await CustomerModel.find({phone: name});
    var datetime = new Date();
    console.log("\x1b[92m" + datetime.toLocaleString('vi-VN') + "\x1b[37m");
    res.send(users);
  });

router.post('/updateStatus/OnTheWay', async function(req,res){
    const {id} = req.body;
    await CustomerModel.findByIdAndUpdate(id, {status: 1});
    var datetime = new Date();
    console.log("\x1b[92m" + datetime.toLocaleString('vi-VN') + "\x1b[37m");
    res.sendStatus(200);
})
router.post('/updateStatus/Delivered', async function(req,res){
    const {id} = req.body;
    await CustomerModel.findByIdAndUpdate(id, {status: 2});
    var datetime = new Date();
    console.log("\x1b[92m" + datetime.toLocaleString('vi-VN') + "\x1b[37m");
    res.sendStatus(200);
})
router.post('/updateStatus/Cancled', async function(req,res){
    const {id} = req.body;
    await CustomerModel.findByIdAndUpdate(id, {status: 3});
    var datetime = new Date();
    console.log("\x1b[92m" + datetime.toLocaleString('vi-VN') + "\x1b[37m");
    res.sendStatus(200);
})
module.exports = router;