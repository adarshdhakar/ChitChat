const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// Define the user schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'], // Basic email validation
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Attach passport-local-mongoose plugin to add username and password hashing
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email', // Set email as the username field for login
});

module.exports = mongoose.model("User", userSchema);
