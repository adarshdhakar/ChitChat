const User = require("../models/user");

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            res.status(201).json({ message: "User registered successfully", user: registeredUser });
        });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

module.exports.login = async (req, res) => {
    console.log(req);
    req.flash("success", "Welcome back!");
    const redirectUrl = res.locals.redirectUrl || "/"; // Redirect URL after successful login
    res.status(200).json({ message: "Login successful", redirectUrl });
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You are logged out!");
        res.status(200).json({ message: "Logout successful" });
    });
};
