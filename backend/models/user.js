const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'],
    },
    profileImageUrl: { 
        type: String, 
        default: '/default_profile.png' 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Add passport-local-mongoose to userSchema
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model("User", userSchema);
