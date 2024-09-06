// // const Listing=require("../models/listing");
// // const { listingSchema } = require("../schema.js");
// // const ExpressError = require("../utils/ExpressError.js");

// // module.exports.index=async (req, res) => {
   
// //     const allListings = await Listing.find({});
// //     console.log(allListings); // Log the fetched listings
// //     res.render("listings/index.ejs", { allListings });
// // };


// // module.exports.renderNewForm=(req,res)=>{
// //     res.render("listings/new.ejs")
// // }

// // module.exports.showListing=async(req,res)=>{
// //     let {id}=req.params;//we got id
// //     const listing= await Listing.findById(id)
// //     .populate("reviews")
// //     .populate("owner");//populate convert id to full fillings
// //     if(!listing){
// //         req.flash("error"," Listing you requested not exist");
// //      res.redirect("/listings");
// //     }
// //      console.log(listing);
    
// //     res.render("listings/show.ejs", { listing });
    
// //     };

// //     module.exports.createListing=async(req,res,next)=>{
// //         let result=listingSchema.validate(req.body);
// //         console.log(result);
// //         const newListing=new Listing(req.body.listing);
// // newListing.owner=req.user._id;
// // await newListing.save();
// // req.flash("success","New Listing Created")
// // res.redirect("/listings"); 
// // };

// // module.exports.editListing=async(req,res)=>{
// //     let {id}=req.params;//we got id
// //     const listing= await Listing.findById(id);
// //     if(!listing){
// //         req.flash("error"," Listing you requested not exist");
// //      res.redirect("/listings");}
// //     res.render("listings/edit.ejs",{listing});
// // }

// // module.exports.updateListing=async (req, res) => {
// //     if(!req.body.listing){
// //         throw new ExpressError(400,"Send valid Data for Listing");//send post in hopscottch->https://localhost:8080/listings
// //        }//errorExpress
// //     let { id } = req.params;
// //     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
// //     req.flash("success","Listing updated")
// //     res.redirect(`/listings/${id}`);//updated
// //   }

// //   module.exports.deleteListing= async (req, res) => {
// //     let { id } = req.params;
// //     let deletedListing = await Listing.findByIdAndDelete(id);
// //     console.log(deletedListing);
// //     req.flash("success","Listing deleted")
// //     res.redirect("/listings");
// //   }

// const Listing = require("../models/listing");
// const { listingSchema } = require("../schema.js");
// const ExpressError = require("../utils/ExpressError.js");

// module.exports.index = async (req, res) => {
//     const allListings = await Listing.find({});
//     console.log(allListings); // Log the fetched listings
//     res.render("listings/index.ejs", { allListings });
// };

// module.exports.renderNewForm = (req, res) => {
//     res.render("listings/new.ejs");
// };

// module.exports.showListing = async (req, res) => {
//     let { id } = req.params; // we got id
//     const listing = await Listing.findById(id)
//         .populate("reviews")
//         .populate("owner"); // populate convert id to full fillings
//     if (!listing) {
//         req.flash("error", "Listing you requested not exist");
//         return res.redirect("/listings");
//     }
//     console.log(listing);
//     res.render("listings/show.ejs", { listing });
// };

// module.exports.createListing = async (req, res, next) => {
//     let result = listingSchema.validate(req.body);
//     console.log(result);
//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     await newListing.save();
//     req.flash("success", "New Listing Created");
//     res.redirect("/listings");
// };

// module.exports.editListing = async (req, res) => {
//     let { id } = req.params; // we got id
//     const listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error", "Listing you requested not exist");
//         return res.redirect("/listings");
//     }
//     res.render("listings/edit.ejs", { listing });
// };

// module.exports.updateListing = async (req, res) => {
//     if (!req.body.listing) {
//         throw new ExpressError(400, "Send valid Data for Listing"); // send post in hopscotch->https://localhost:8080/listings
//     } // errorExpress
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     req.flash("success", "Listing updated");
//     res.redirect(`/listings/${id}`); // updated
// };

// module.exports.deleteListing = async (req, res) => {
//     let { id } = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     req.flash("success", "Listing deleted");
//     res.redirect("/listings");
// };
