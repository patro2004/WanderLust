const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Listing = require("../models/listing"); // Ensure the correct path
const flash=require("connect-flash");
const {isLoggedIn,isOwner}=require("../middleware.js")
// const listingController=require("../controllers/listings.js")

const validateListing=(req,res,next)=>{
    let{error}=listingSchema.validate(req.body);
 //    console.log(result);
    if(error){
     let errMsg=error.details.map((el)=>el.message).join(",");
     throw new ExpressError(400,errMsg);
 }else{
     next();
 }
 };

// Index Route
router.get("/", wrapAsync(
    async (req, res) => {
    const allListings = await Listing.find({});
    console.log(allListings); // Log the fetched listings
    res.render("listings/index.ejs", { allListings })
}));

 
//New Route
router.get("/new",isLoggedIn,(req,res)=>{//req came from index.ejs
    console.log(req.user);
//     if(!req.isAuthenticated()){
//     req.flash("error","you must be logged in to create listing")
//   res.redirect("/login")}
res.render("listings/new.ejs");
})

//Show Route
router.get("/:id",wrapAsync(async(req,res)=>{
let {id}=req.params;//we got id
const listing= await Listing.findById(id)
.populate("reviews")
.populate("owner");//populate convert id to full fillings
if(!listing){
    req.flash("error"," Listing you requested not exist");
 res.redirect("/listings");
}
 console.log(listing);

res.render("listings/show.ejs", { listing });

}));

//create route
router.post("/",
validateListing,
wrapAsync(async(req,res,next)=>{
    let result=listingSchema.validate(req.body);
    console.log(result);

   //let{title,description,image,price,country,location}=req.body; or do listing[key name]
   
//    //add erpress error
//    if(!req.body.listing){
//     throw new ExpressError(400,"Send valid Data for Listing");//send post in hopscottch->https://localhost:8080/listings
//    }
//    let listing=req.body.listing;
//    const newListing= new Listing(listing);
// })
// )//hopscotch->/listings=>//post


//2.add wrapAsync suer price->abcd

const newListing=new Listing(req.body.listing);
newListing.owner=req.user._id;
await newListing.save();
req.flash("success","New Listing Created")
res.redirect("/listings"); 
})
);


//1.custom error handling
// try{
//     const newListing=new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");     

// }catch(err){
//     next(err);
// }
// })
// 1.use async//price-abcd//if u comment out app.use then validation error will come
//wrapAsync-better way to write try catch block create utils->wrapasync.js


//validation for schema
//    if(!newListing.description){
//     throw new ExpressError(400,"Description is missing");
//    }
//    if(!newListing.title){
//     throw new ExpressError(400,"title is missing");
//    }
//    if(!newListing.location){
//     throw new ExpressError(400,"location is missing");
//    }
//    if(!newListing.Price){
//     throw new ExpressError(400,"Price is missing");
//    }USE JOI->validate schema(server side validation)
//    await newListing.save();
//    res.redirect("/listings");
//    }
// )
// );

//edit
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let {id}=req.params;//we got id
    const listing= await Listing.findById(id);
    if(!listing){
        req.flash("error"," Listing you requested not exist");
     res.redirect("/listings");}
    res.render("listings/edit.ejs",{listing});
}));

//update
router.put("/:id",isLoggedIn,isOwner,validateListing,
 wrapAsync(async (req, res) => {
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid Data for Listing");//send post in hopscottch->https://localhost:8080/listings
       }//errorExpress
    let { id } = req.params;
    // let listing=await Listing.findById(id);
    // if(! listing.owner._id.equals(res.locals.currUser._id)){
    //     req.flash("error","You dont have permission to edit")
    //     return res.redirect(`/listings/${id}`)
    // }
   
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Listing updated")
    res.redirect(`/listings/${id}`);//updated
  }));

   
  //delete
  router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing deleted")
    res.redirect("/listings");
  }));

module.exports=router;
