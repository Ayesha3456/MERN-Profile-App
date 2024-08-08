const PersonalInfo = require('../Model/personalInfoModel');

exports.createPersonalInfo = async (req, res) => {
    try {
        const newInfo = new PersonalInfo(req.body);
        await newInfo.save();
        res.status(201).json(newInfo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.fetchAllPersonalInfo = async (req, res) => {
    try {
        const info = await PersonalInfo.find();
        res.status(200).json(info);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updatePersonalInfo = async (req, res) => {
    try {
        const updatedInfo = await PersonalInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedInfo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deletePersonalInfo = async (req, res) => {
    try {
        await PersonalInfo.findByIdAndDelete(req.params.id);
        res.status(204).json({});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
