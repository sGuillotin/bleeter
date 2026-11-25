const models = require('../models');
const Domo = models.Domo;

const makerPage = async (req, res) => {
    return res.render('app');
};

const makeDomo = async (req, res) => {
    if (!req.body.content) {
        return res.status(400).json({ error: 'text is required, apparently.' });
    }

    const domoData = {
        content: req.body.content,
        authorId: req.session.account._id,
    };

    try {
        const newDomo = new Domo(domoData);
        await newDomo.save();
        console.log({ content: newDomo.content, authorId: newDomo.authorId });
        return res.status(201).json({ content: newDomo.content, authorId: newDomo.authorId });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Bleet already exists.' });
        }
        return res.status(500).json({ error: 'An error occurred while Bleeting.' });
    }
};

const getDomos = async (req, res) => {
    try {
        const query = { authorId: req.session.account._id };
        const docs = await Domo.find(query).select('content').lean().exec();
        return res.json({ domos: docs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retrieving bleets!' });
    }
};

// const levelUpDomos = async (req, res) => {
//     try {
//         const query = { authorId: req.session.account._id };
//         await Domo.updateMany(query, { $inc: { level: 1 } }).exec();
//         return res.status(200).json({ message: 'All Domos leveled up!' });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: 'Error leveling up domos!' });
//     }
// };

module.exports = {
    makerPage,
    makeDomo,
    getDomos,
};