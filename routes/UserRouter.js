const express = require('express');

const {authenticate} = require('../utils');
const db = require('../db');

const router = express.Router();

router.post('/save-info', authenticate, (req,res)=>{

    var info = req.body.data;

    db.User.updateOne({ _id: req.user._id }, info).then(user => {
		res.json({ success: true, message: `Info Updated` });
	}).catch(error => {
		res.send({ success: false, message: `${error.message}` });
	});
});

router.post('/get-info', authenticate, (req,res)=>{

    db.User.findOne({ _id: req.user._id }).then(user => {
        const {categories, contactInformation} = user;
		res.json({ success: true, info: {categories, contactInformation}, message: `Info fetched` });
	}).catch(error => {
		res.send({ success: false, message: `${error.message}` });
	});
});

module.exports = router;