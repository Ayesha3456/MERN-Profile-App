const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true }
});

module.exports = mongoose.model('PersonalInfo', personalInfoSchema);
