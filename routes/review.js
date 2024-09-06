// // const express=require("express");
// // const router=express.Router({mergeParams:true});
// // const wrapAsync=require("../utils/wrapAsync.js");
// // const ExpressError=require("../utils/ExpressError.js");
// // const {reviewSchema}=require("../schema.js");
// // const Listing = require("../models/listing"); // Ensure the correct path
// // const Review = require("../models/review"); // Ensure the correct path


// // const validateReview=(req,res,next)=>{
// //     let{error}=reviewSchema.validate(req.body);
// //  //    console.log(result);
// //     if(error){
// //      let errMsg=error.details.map((el)=>el.message).join(",");
// //      throw new ExpressError(400,errMsg);
// //  }else{
// //      next();
// //  }
// //  };

// // router.post('/', 
// // validateReview, 
// // wrapAsync(async (req, res) => {
// //     console.log(req.params.id);
// //     let listing = await Listing.findById(req.params.id);
// //     let newReview = new Review(req.body.review); // Adjusted to match the schema
// //     listing.reviews.push(newReview);
// //     await newReview.save();
// //     await listing.save();
// //     res.redirect(`/listings/${listing._id}`);
// // }));


// // router.delete("/:reviewId", wrapAsync(async (req, res) => {
// //     let { id, reviewId } = req.params;
// //     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
// //     await Review.findByIdAndDelete(reviewId);

// //     res.redirect(`/listings/${id}`);
// // }));

// // module.exports=router;
// const express = require("express");
// const router = express.Router({ mergeParams: true });
// const wrapAsync = require("../utils/wrapAsync");
// const ExpressError = require("../utils/ExpressError");
// const { reviewSchema } = require("../schema");
// const Listing = require("../models/listing");
// const Review = require("../models/review");

// const validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if (error) {
//         const errMsg = error.details.map(el => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// };

// router.post("/", validateReview, wrapAsync(async (req, res) => {
//     console.log("Review POST route hit");
//     const listing = await Listing.findById(req.params.id);
//     if (!listing) {
//         throw new ExpressError(404, "Listing not found");
//     }
//     console.log("Listing found:", listing);
//     const newReview = new Review(req.body.review);
//     listing.reviews.push(newReview);
//     await newReview.save();
//     await listing.save();
//     console.log("New review saved:", newReview);
//     res.redirect(`/listings/${listing._id}`);
// }));

// router.delete("/:reviewId", wrapAsync(async (req, res) => {
//     const { id, reviewId } = req.params;
//     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/listings/${id}`);
// }));

// module.exports = router;
