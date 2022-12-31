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
    // businessDetails: {
    //     bName: { type:String, required:true },
    //     category: { type:String, required:true },
    //     pincode: { type:String, required:true },
    //     address: { type:String, required:true },
    //     state: { type:String, required:true },
    //     city: { type:String, required:true },
    // },
    // bankDetails: {
    //     bankName: { type:String, required:true },
    //     accountName: { type:String, required:true },
    //     ifsc: { type:String, required:true },
    //     accountNumber: { type:String, required:true },
    // },
    // bookings:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
});

const userModel = mongoose.model('User2',userSchema);

module.exports = userModel;