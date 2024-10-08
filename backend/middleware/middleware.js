// backend/middleware/middleware.js

const ExpressError = require("../utils/ExpressError.js");

// Middleware to check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // Store the original URL the user wanted to access
        console.log(req);
        req.session.redirectUrl = req.originalUrl;
        return res.status(401).json({ error: "You must be logged in to access this resource" });
    }
    next();
};

// Middleware to save the redirect URL to be used after login
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        // Clear redirectUrl from session after saving to locals
        delete req.session.redirectUrl;
    }
    next();
};

// module.exports.isOwner = async (req, res, next) => {
//     let {id} = req.params;
//     let listing = await Listing.findById(id);
//     if(!listing.owner._id.equals(res.locals.currUser._id)){
//         req.flash("error", "You are not the owner of this listing!");
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// };

// module.exports.validateListing = ((req, res, next) => {
//     let {error} = listingSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     }
//     else {
//         next();
//     }
// });


// module.exports.validateReview = ((req, res, next) => {
//     let {error} = reviewSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     }
//     else {
//         next();
//     }
// });

// module.exports.isReviewAuthor = wrapAsync(async (req, res, next) => {
//     let {id} = req.params;
//     let review = await Review.findById(id);
//     console.log(review);
//     if(!review.author._id.equals(res.locals.currUser._id)){
//         req.flash("error", "You are not the author of this review!");
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// });