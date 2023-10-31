const express = require('express');

const Category = require('../models/category');

exports.GetCategory=(req,res)=>{
    Category.find()
    .then(category=>{
    res.render('categoryList',{title:'Kategori Listesi',category:category})
    })
}
exports.GetAddCategory=(req,res)=>{

    res.render('addCategory')

}
exports.postAddCategory=(req,res)=>{

    const category = new Category({
        adi: req.body.adi
    })
    
    category.save()
    .then(()=>{
        res.redirect('/category')
    }).catch((err)=>{
        console.log(err);
    })

}
exports.GetEditCategory=(req,res)=>{
    Category.findById({_id:req.params.id})
    .then(category=>{
    res.render('editCategory',{category:category})
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.postEditCategory=(req,res)=> {
    const id=req.body.id
    const adi= req.body.adi

    Category.updateOne({_id:id},{
        $set:{
            adi: adi
        }
    })
    .then(()=>{
        res.redirect('/category')
    })
    .catch((err)=>{
        console.log(err);
    })   
}

exports.getDeleteCategory=(req,res)=>{
    Category.findByIdAndDelete({_id:req.params.id})
    .then(()=>{
        res.redirect('/category')
    }).catch((err)=>{
        console.log(err);
    })
}