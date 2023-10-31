const express = require('express');

const Movie = require('../models/movie')
const Category = require('../models/category')

exports.GetMoviesList=(req,res)=>{
   
    Movie.find()
    .then(movies=>{

            res.render('moviesList',{movies:movies,category:cate})

    })
}

exports.getGetByCatMovie=(req,res)=>{
    const id = req.params.id;
    Movie.find({kategor:id})
    .then(movies=>{
        res.render('moviesList',{movies:movies})
        })
}

exports.postSearchMovie=(req,res)=>{        
    Movie.find({ filmAdi: { $regex: req.body.filmAdi, $options: 'i' } })
    .then(movies=>{
        res.render('movies',{
            title:'Movie List',
            movieList:movies            
        })
    }).catch((err)=>{
        console.log(err);
    })
}

exports.getdeleteMovie=(req,res)=>{
    Movie.findByIdAndDelete({_id:req.params.id})
    .then(()=>{
        res.redirect('/movies/list')
    }).catch((err)=>{
        console.log(err);
    })     
}
exports.getDetailMovie=(req,res)=>{
    Movie.findById({_id:req.params.id})
    .then(movies=>{
    res.render('movieDetail',{movie:movies})
    })
    .catch((err)=>{
        console.log(err);
    })
}


exports.getEditMovie=(req,res)=>{
    Category.find()
    .then(cat=>{
        Movie.findById({_id:req.params.id})
        .then(movies=>{
            res.render('editMovie',{movies:movies, category: cat})
        })
    })  

    .catch((err)=>{
        console.log(err);
    })
}
exports.postEditMovie=(req,res)=>{
    const id=req.body.id
    const filmAdi= req.body.filmAdi
    const yonetmen= req.body.yonetmen
    const oyuncular= req.body.oyuncular
    const imgUrl = req.body.imgUrl
    Movie.updateOne({_id:id},{
        $set:{
            filmAdi: filmAdi,
            yonetmen: yonetmen,
            oyuncular:oyuncular,
            imgUrl:imgUrl
        }
    })
    .then(()=>{
        res.redirect('/movies/list')
    })
    .catch((err)=>{
        console.log(err);
    })   
}


exports.GetMovies=(req,res)=>{
    //Movie.find()
    //Movie.find({filmAdi:'Titanik'})
    //Movie.find({filmAdi:/^T/})  //T ile başlayan demek
    //Movie.find({filmAdi:/k$/})   //k ile bitenler
    //Movie.find({filmAdi:/.*f.*/})   // f harfi içerenler
    //Movie.find({ filmAdi: { $regex: req.body.filmAdi, $options: 'i' } })
    //sorgu pğeratörleri 
    //eq (equal), ne (not equal), gt (geater then) , lt (less then), gte(greater then or equal), lte(less then or equal), in ,not in
    //Movie.find({filmAdi:{$gt: 'E'}}) // e harfinden sonraki harflerle başlayanlar
    //Movie.find({filmAdi:{$in: ['film','Titanik']}})  //bu filmler gelsin demek
    
    //.or({_id:{$eq: '65350cd07855436568be6c73'}})  // id si bu olan
    // .or([   //veya olan sorgular
    //     { filmAdi: {$gt: 'b'} },   //ismi b ve b den sonraki  veya
    //     { filmAdi: /.*t.*/ }   // içinde t olan 
    //   ])
    // .skip(1)  // başta 1 taneyi atla
    // .limit(2)  // üstten 2 tane göster
    // .select({filmAdi:1, imgUrl:1})  // sadece yazılan kolonları getirir
    //.sort({filmAdi:1})    //1 A->Z -1 Z->A

    Movie.find()
    .then(movies=>{
        res.render('movies',{
            title:'Movie List',
            movieList:movies,
           // category: Category.find()            
        })
    })
    
    .catch((err)=>{
        console.log(err);
    })

}
exports.getAddMovie=(req,res)=>{
    Category.find()
    .then((category)=>{ 
        res.render('addMovie',{title:'Film Ekle',category:category})
    }).catch((err)=>{
        console.log(err);
    })
    
}

exports.postAddMovie=(req,res,next)=>{
    const movie = new Movie({
        filmAdi: req.body.filmAdi,
        yonetmen: req.body.yonetmen,
        oyuncular: req.body.oyuncular,
        imgUrl : req.body.imgUrl,
        kategori:req.body.kategori
    })
    
    movie.save()
    .then(()=>{
        console.log(movie);
        res.redirect('/movies')
    }).catch((err)=>{
        console.log(err);
    })
}

