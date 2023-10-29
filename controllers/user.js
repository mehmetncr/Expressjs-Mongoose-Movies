const bcrypt = require('bcrypt')
const User = require('../models/user')


exports.getLoginUser=(req,res)=> {
    res.render('login',{title:'Giriş'})
}
exports.postLoginUser=(req,res)=> {
    const {userName,password} = req.body
    User.findOne({userName:userName})
    .then(user=>{
        if (!user){
            res.render('login',{title:'Giriş',error:'Kullanıcı Bulunamadı!'})
        }
        else{
            bcrypt.compare(password,user.password)
            .then((result)=>{
                if(result){
                    req.session.user=user;
                    req.session.loggedIn=true;
                    req.session.save();
                    res.redirect('/')
                }
                else{
                    res.render('login',{title:'Giriş',error:'Hatalı Şifre'})
                }
            })
            .catch(err=>{
                res.render('login',{title:'Giriş',error:err})
            })
        }
    })
    .catch(err=>{
        res.render('login',{title:'Giriş',error:err})
    })

}

exports.getRegisterUser=(req,res)=>{
    res.render('register',{title:'Kayıt Ol'})
}
exports.postRegisterUser=(req,res)=>{
    const {userName,name,surName,eMail,password} = req.body;
    bcrypt.hash(password,10 ,(err,hash)=>{
        if (err){
            res.render('register', {title:'Kayıt Ol', error:err});
        }
        else{
            const user = new User({
                userName:userName,
                name:name,
                surName:surName,
                eMail:eMail,
                password:hash
            })
            user.save()
            .then(()=>{
                res.redirect('/login')
            })
            .catch((err)=>{
                res.render('register',{title:'Kayıt Ol', error:err});
            })
        }      
    })
}


exports.getLogOutUser=(req,res)=>{
    req.session.destroy();
    res.redirect('/');
}