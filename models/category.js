const mongoose = require('mongoose');
const Schema= mongoose.Schema

//obje tanımlanır
const CategorySchema=new Schema({
    adi: String,
    filmler: [{
        type: Schema.Types.ObjectId,
        ref: 'movie'
    }]
})

module.exports=mongoose.model('category',CategorySchema)