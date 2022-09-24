const jwt = require('jsonwebtoken')
const  UserModel  = require('../models/userModel')
const { printCustomMsgApi } = require('../helpers/commonfunction')

exports.authUser = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (token == "" || token == null || token == "undefined") {
            return res.send(printCustomMsgApi(false, 'Token is missing from header', 422, '', {}));
        }
        const decoded = jwt.verify(token, process.env.SUPERSECRET)
       
        let user = await UserModel.findOne({ _id: decoded._id }).exec();
        if (!user) {
                return res.send(printCustomMsgApi(false, 'Please Login Again to proceed further', 401, '', {}));
        }

        req.userid = decoded._id;
        next();

    } catch (error) {
        console.log(error.message)
        return res.send(printCustomMsgApi(false, 'Invalid Token', 401, '', {}));
    }
}