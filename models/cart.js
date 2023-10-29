const mongoose = require('mongoose');

const Schema= mongoose.Schema

//obje tanımlanır
const CartSchema=new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    cartDetail:[{
        type: Schema.Types.ObjectId,
        ref:'cartDetail'
    }],
    totalPrice: Number,
    date:Date
  
})

module.exports=mongoose.model('cart',CartSchema)