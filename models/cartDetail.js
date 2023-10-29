const mongoose = require('mongoose');

const Schema= mongoose.Schema

//obje tanımlanır
const CartDetailSchema=new Schema({
    cart:{
        type: Schema.Types.ObjectId,
        ref:'cart'
    },
    movie:{
        type: Schema.Types.ObjectId,
        ref:'movie'
    },
    price: Number,
    date:Date,
    quantity:Number,
    totalPrice:Number  
})

module.exports=mongoose.model('cartDetail',CartDetailSchema)