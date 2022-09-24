const mongoose = require('mongoose');

var userDetails = new mongoose.Schema({
    name: {
        type: String,
        default : ''
    },
    mobile: {
        type: String,
        default : ''
    },
    is_verified: {
        type: Boolean,
        default: false
    },
},{
    versionKey: false,
    timestamps: true
})


userDetails.index({ createdAt: -1 });


module.exports = mongoose.model('user_details',userDetails);