const express = require('express');
const Cart = require('../models/cart');
const CartDetail = require('../models/cartDetail');
const Movie = require('../models/movie');


exports.getCart=(req,res)=>{
    const cart = req.session.cart||[];
    res.render('cart',{title:'sepet',cart: cart})
   
}

exports.getAddCart=(req,res)=>{
    const cart = req.session.cart||[];
    const movie = cart.find(item => item.movie.toString() == req.params.id);
    if (movie){
        movie.quantity+=1   
    }
    else{
        Movie.findOne({_id:req.params.id})
    .then(movie=>{
       
        const detail = new CartDetail({
            date: new Date,
            movie: movie._id,
            price:movie.fiyat,
            quantity:1,
            totalPrice:movie.fiyat
        })
        
        if (!req.session.cart) {
            req.session.cart = [];
        }
          req.session.cart.push(detail);  
          req.session.save();
          console.log(req.session.cart.length);     
    })  
    }
    req.session.cart = cart; 
    req.session.save();
 
}

exports.getPaymentCart=(req,res)=>{
    if (req.session.loggedIn){
        const carts = req.session.cart
        let total= 0;
        carts.forEach(cart => {
            total += cart.price*cart.quantity
        })
        const cart = new Cart({
            date: new Date,
            totalPrice:total,
            user:req.session.user._id,
            cartDetail:req.session.cart
        })
        cart.save()
        .then(cart=>{            
            carts.forEach(cart => {
                const detail = new CartDetail({
                    date: cart.date,
                    movie: cart.movie,
                    price:cart.price,
                    quantity:cart.quantity,
                    totalPrice:cart.totalPrice                   
                })
                detail.save()
            });
            req.session.cart=null
            res.redirect('/')
        })
       
    }
    else{
        res.redirect('/users/login')
    }
    
}