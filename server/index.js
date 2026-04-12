require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3001;
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crypay';

mongoose.connect(DB_URI)
    .then(() => {
        console.log(' Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(` Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err.message);
        process.exit(1);
    });
