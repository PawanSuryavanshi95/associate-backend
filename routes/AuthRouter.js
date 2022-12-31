const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db');

const router = express.Router();

router.post('/sign-up', (req,res)=>{

    var newUser = req.body.data;

    db.User.findOne({
        $or:[{email: newUser.email}]
    }).then( user => {
        if(!user){
            bcrypt.hash(newUser.pass, 10, (error, hash) => {
                newUser.pass = hash;
                db.User.create(newUser).then(user => {
                    var payLoad = {
                        _id: user._id,
                        email: user.email,
                        phone: user.phone,
                    };
                    var token = jwt.sign(payLoad, "TEST_SECRET", {
                        expiresIn: 60*60*24
                    });
                    console.log("D");
                    res.json({success:true, message: `${user.email} has been registered.`, _id:user._id, token:token});
                }).catch(error => {
                    res.send({success:false, message:`${error.message}`});
                });
            });
        }
        else res.json({success:false, message: `${user.email} already exists.`});
    }).catch(error => {
        res.send({success:false, message:`${error.message}`});
    });
});

router.post('/sign-in',(req,res)=>{
    
    db.User.findOne({
        $or: [
            { email: req.body.email },
        ]
    }).then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.pass, user.pass)){
                var payLoad = {
                    _id: user._id,
                    email: user.email,
                    phone: user.phone,
                };
                var token = jwt.sign(payLoad, "TEST_SECRET", {
                    expiresIn: 60*60*24
                });
                res.send({success:true, token, user});
            }
            else res.json({success:false, message: 'Incorrect email or password'});
        }
        else res.json({success:false, message: 'User not found.'});
        
    }).catch(error => {
        res.send({success:false, message:error.message});
    });
});


module.exports = router;