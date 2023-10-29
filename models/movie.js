const mongoose = require('mongoose');

const Schema= mongoose.Schema

//obje tanımlanır
const MovieSchema=new Schema({
    filmAdi: String,
    yonetmen: String,
    oyuncular: String,
    imgUrl : String,
    kategori:{
        type: Schema.Types.ObjectId,
        ref:'category'
    },
    fiyat :Number,
    cartDetail:[{
        type: Schema.Types.ObjectId,
        ref:'cartDetail'
    }]
})

module.exports=mongoose.model('movie',MovieSchema)