const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: '/storage/user_image/default-user.jpg'
    },

    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);