const mongoose = require('mongoose');
const db = require('config').get('mongoURI');
//const db = config.get('mongoURI');


const connectDB = async () => {

    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;