const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ["OPEN","ASSIGNED","DONE"],
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);