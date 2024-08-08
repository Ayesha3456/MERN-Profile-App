const Education = require('../Model/educationModel');

exports.createEducation = async (req, res) => {
    try {
        const newEducation = new Education(req.body);
        await newEducation.save();
        res.status(201).json(newEducation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.fetchAllEducation = async (req, res) => {
    try {
        const education = await Education.find();
        res.status(200).json(education);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateEducation = async (req, res) => {
    try {
        const updatedEducation = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedEducation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteEducation = async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.status(204).json({});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
