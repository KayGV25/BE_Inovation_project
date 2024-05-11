const express = require('express');
const router = express.Router();
const CustomerModel = require('../models/customer');
const { google } = require("googleapis");

const LOOKUPSTATUS = {
    0:"In Stock",
    1:"Delivering",
    2:"Delivered",
    3:"Cancled",
    "In stock": 0,
    "Delivering": 1,
    "Delivered": 2,
    "Cancled": 3
}

router.post('/new-customer', async function(req, res) {

    let { name, address, email, phone, productQuantity } = req.body;
    
    let currentTime = new Date();
    let formattedDate = new Intl.DateTimeFormat('vi-VN').format(currentTime);
    
    const auth = new google.auth.GoogleAuth({
        keyFile: "credential.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    const client = await auth.getClient();

    const googleSheets = google.sheets({version: "v4", auth: client});
    const spreadsheetId = "1NdrrHMRSGG9LpzjxVA-as_gnkZgzQIY-TqpPivB-EPE";

    // const metaData = await googleSheets.spreadsheets.get({
    //     auth,
    //     spreadsheetId,
    // });

    //Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "DB!A:H",
    });
    
    let a = getRows.data.values;
    let count = 0;
    a.forEach((item)=>{
        count++;
    })
    Myid = '' + (count+1) + currentTime.valueOf();

    let newCustomer = new CustomerModel({
        Cid: Myid,
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

    // Write row(s) to sheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "DB!A:H",
        valueInputOption: "USER_ENTERED",
        resource:{
            values: [
                [Myid, formattedDate, name, address, email, phone, productQuantity, LOOKUPSTATUS[0]]
            ]
        }
    })

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

async function Update(User, Type){
    const auth = new google.auth.GoogleAuth({
        keyFile: "credential.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    const client = await auth.getClient();

    const googleSheets = google.sheets({version: "v4", auth: client});
    const spreadsheetId = "1NdrrHMRSGG9LpzjxVA-as_gnkZgzQIY-TqpPivB-EPE";

    //Read rows from spreadsheet
  
    const cord = User.Cid[0];
    await googleSheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range: `DB!H${cord}`,
        valueInputOption: "USER_ENTERED",
        resource:{
            values: [LOOKUPSTATUS[Type]]
        }
    })
}

router.post('/updateStatus/OnTheWay', async function(req,res){
    const {id} = req.body;
    await CustomerModel.findByIdAndUpdate(id, {status: 1});
    const fetchUser = await CustomerModel.findById(id);
    Update(fetchUser, 1)
    var datetime = new Date();
    console.log("\x1b[92m" + datetime.toLocaleString('vi-VN') + "\x1b[37m");
    res.sendStatus(200);
})
router.post('/updateStatus/Delivered', async function(req,res){
    const {id} = req.body;
    await CustomerModel.findByIdAndUpdate(id, {status: 2});
    const fetchUser = await CustomerModel.findById(id);
    Update(fetchUser, 2)
    var datetime = new Date();
    console.log("\x1b[92m" + datetime.toLocaleString('vi-VN') + "\x1b[37m");
    res.sendStatus(200);
})
router.post('/updateStatus/Cancled', async function(req,res){
    const {id} = req.body;
    await CustomerModel.findByIdAndUpdate(id, {status: 3});
    const fetchUser = await CustomerModel.findById(id);
    Update(fetchUser, 3)
    var datetime = new Date();
    console.log("\x1b[92m" + datetime.toLocaleString('vi-VN') + "\x1b[37m");
    res.sendStatus(200);
})
module.exports = router;