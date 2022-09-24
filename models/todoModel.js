const mongoose = require('mongoose');

var todolist = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user_details' },
    title: {
        type: String,
        default : ''
    },
    description: {
        type: String,
        default : ''
    },
    task_date: {
        type: Date,
        default : Date
    },
    is_deleted : {      
        type: Boolean,
        default : false
    }                       // For Soft delete
},{
    versionKey: false,
    timestamps: true
})

todolist.index({ createdAt: -1 });
todolist.index({ user_id: 1 });

module.exports = mongoose.model('todo-lists',todolist);