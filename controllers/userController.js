const jwt = require('jsonwebtoken')
const TodoModel = require('../models/todoModel');
const UserModel = require('../models/userModel');
const { printCustomMsgApi } = require('../helpers/commonfunction')


exports.Login = async (req, res) => {
    try {
        if(req.body.name == undefined || req.body.mobile == undefined){
            return res.send(printCustomMsgApi(false, "Please fill up all fields", 422, '', {} ));
        }

        const isUserExits = await UserModel.findOne({ 'mobile': req.body.mobile }).exec()
        if(!isUserExits) {
                let user_obj = {
                    name : req.body.name,
                    mobile : req.body.mobile
                };
                let new_user = new UserModel(user_obj);
                await new_user.save();
        
                return res.send(printCustomMsgApi(true, "User Registered successfully. Please verify further.", 200, '', {} ));
        
            } else {
                isUserExits.name = req.body.name,
                isUserExits.mobile = req.body.mobile
                await isUserExits.save();
                return res.send(printCustomMsgApi(true, "Please verify the user further.", 200, '', {} ));
        }
       
        
     
    } catch (error) {
        console.log(error.message);
        return res.send(printCustomMsgApi(false,"Some Technical Issue.", 500));
    }
}


exports.verifyUser = async (req, res) => {
    try {
        
        const isUserExits = await UserModel.findOne({ 'mobile': req.body.mobile }).exec()
        if(isUserExits != null) {

            isUserExits.is_verified = true;
            await isUserExits.save();

            let payload = { _id: isUserExits._id};
            let token = jwt.sign(payload, process.env.SUPERSECRET, { expiresIn: '30d' });

            return res.send(printCustomMsgApi(true,"Congratulations ! You have been verified successfully.",200, token, isUserExits));
        }

        return res.send(printCustomMsgApi(false, "Unauthorized User !",422));
        
    } catch (error) {
        console.log(error.message);
        return res.send(printCustomMsgApi(false, "Some Technical issue", 500));
    }
}


exports.createTask = async (req, res) => {
    try {
            let task_obj = {};
            task_obj.user_id = req.userid;
            task_obj.title = req.body.title;
            task_obj.description = req.body.description;
            task_obj.task_date = new Date();

            let new_task = new TodoModel(task_obj);
            await new_task.save();

            return res.send(printCustomMsgApi(true,"Your task has been added successfully.",200));

    } catch (error) {
        console.log(error.message);
        return res.send(printCustomMsgApi(false, "Some Technical issue", 500));
    }
}

exports.getTask = async (req, res) => {
    try {
            const Task = await TodoModel.find({ user_id: req.userid, is_deleted : false }).lean().exec();
            if(Task.length == 0) return res.send(printCustomMsgApi(true,"No Tasks available",200,'',[]));

            return res.send(printCustomMsgApi(true,"Task loaded successfully.",200,'',Task));

    } catch (error) {
        console.log(error.message);
        return res.send(printCustomMsgApi(false, "Some Technical issue", 500,'',[]));
    }
}


exports.updateTask = async (req, res) => {
    try {
            const Task = await TodoModel.findOne({ _id: req.body.task_id }).exec();
            if(!Task) return res.send(printCustomMsgApi(true,"No Task available",200));

            Task.title  = (req.body.title) ? req.body.title : Task.title
            Task.description  = (req.body.description) ? req.body.description : Task.description
            Task.task_date  = (req.body.task_date) ? req.body.task_date : Task.task_date
            await Task.save();

            return res.send(printCustomMsgApi(true,"Your task has been updated successfully.",200,'',Task));

    } catch (error) {
        console.log(error.message);
        return res.send(printCustomMsgApi(false, "Some Technical issue", 500));
    }
}


exports.deleteTask = async (req, res) => {
    try {
            // Hard Delete
            const Task = await TodoModel.deleteOne({ _id: req.query.task_id }).exec();
            if(Task.deletedCount == 0) return res.send(printCustomMsgApi(false,"Task already deleted or not available !",422));

            //Soft Delete
            //const Task = await TodoModel.updateOne({ _id: req.query.task_id },{ $set : {is_deleted : false }}).exec();

            return res.send(printCustomMsgApi(true,"Your task has been deleted successfully.",200,'',Task));

    } catch (error) {
        console.log(error.message);
        return res.send(printCustomMsgApi(false, "Some Technical issue", 500));
    }
}