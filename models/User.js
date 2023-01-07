var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type:String, required:true, unique:true },
    pass: { type:String, required:true, unique:true },
    phone: { type:String, required:true },
    name: { type:String, required:true },
    description: { type:String, required:true },
    verified: { type:Boolean, default:false },
    preferences: [{ 
        id: {type:Number, required:false},
        name: {type:String, required:false},
    }],
    categories: [{type:String, required:false}],
    contactInformation: {
        name: {type:String, required:false},
        email: {type:String, required:false},
        workExp: {type:String, required:false},
        emergencyContact: {type:String, required:false},
        phone: {type:String, required:false},
        address: {type:String, required:false},
    },
});

const userModel = mongoose.model('User2',userSchema);

module.exports = userModel;