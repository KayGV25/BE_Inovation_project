const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: { type: String, required: true },     // Tên của khách hàng
    address: { type: String, required: true },  // Địa chỉ của khách hàng
    email: { type: String, required: true },    // Địa chỉ email của khách hàng
    phone: { type: String, required: true },    // Số điện thoại của khách hàng
    productQuantity: { type: Number, required: true }, // Số lượng sản phẩm mà khách hàng muốn mua
    ordertime: { type: Date, default: Date.now }, // Thời gian khách hàng đặt hàng 
    status: {type: Number, default: 0}
});

module.exports = mongoose.model("Customer", CustomerSchema);