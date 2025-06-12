const mongoose = require('mongoose');

const dbconnect = () => {
    mongoose.connect(process.env.MONGO_URI, {})
        .catch((err) => {
            process.exit(1); // Exit the process if DB connection fails
        });
};

module.exports = dbconnect;
