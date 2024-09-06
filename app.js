const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing = require("./models/listing"); // Ensure the correct path
const path=require("path");//for ejs
const methodOverride=require("method-override")//for put
const ejsMate=require("ejs-mate");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy = require("passport-local"); // Fixed this line
const User=require("./models/user.js")
const wrapAsync=require("./utils/wrapAsync.js")
const ExpressError=require("./utils/ExpressError.js")
const {listingSchema}=require("./schema.js");
const Review= require("./models/review.js");
const {reviewSchema } = require('./schema.js'); // Import reviewSchema
const listings=require("./routes/listing.js")//routes
const reviews=require("./routes/review.js")
const user=require("./routes/user.js")





//for db
const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';
main().
then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL)
}

app.engine('ejs', ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")))

const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,//u can see this info in appln in inspect
        httpOnly:true,
    }
}


app.get("/",(req,res)=>{
    res.send("hi,i am root");

});

app.use(session(sessionOptions));
app.use(flash());//after flash declare routes

app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));//signup,login
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// // // const validateListing=(req,res,next)=>{
// // //    let{error}=listingSchema.validate(req.body);
// // // //    console.log(result);
// // //    if(error){
// // //     let errMsg=error.details.map((el)=>el.message).join(",");
// // //     throw new ExpressError(400,errMsg);
// // // }else{
// // //     next();
// // // }
// // // };


// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         email:"student@gmail.com",
//         username:"sneha"//automatically given by passport local
//     })
//   let registeredUser= await User.register(fakeUser,"helloworld")//HW is psd
//   res.send(registeredUser);
// })//go to /demouser


// const validateReview=(req,res,next)=>{
//     let{error}=reviewSchema.validate(req.body);
//  //    console.log(result);
//     if(error){
//      let errMsg=error.details.map((el)=>el.message).join(",");
//      throw new ExpressError(400,errMsg);
//  }else{
//      next();
//  }
//  };
 
app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    res.locals.currUser=req.user;
    console.log(res.locals.success)//we saw arr exists in success therefoe add one more condn
    next();
});

app.use("/",user);
app.use("/listings",listings);//router

const validateReview=(req,res,next)=>{
    let{error}=reviewSchema.validate(req.body);
 //    console.log(result);
    if(error){
     let errMsg=error.details.map((el)=>el.message).join(",");
     throw new ExpressError(400,errMsg);
 }else{
     next();
 }
 };
// //  app.use("/listings/:id/reviews",reviews);

// // // app.get("/Listings",(req,res)=>{
// // //  Listing.find({}).then(res=>{
// // //         console.log(res);//give result in terminal after running in web full villla list
// // //     })
// // // })


// // // // Index Route
// // // app.get("/listings", wrapAsync(async (req, res) => {
   
// // //         const allListings = await Listing.find({});
// // //         console.log(allListings); // Log the fetched listings
// // //         res.render("listings/index.ejs", { allListings });
    
// // // }));
// // // //New Route
// // // app.get("/listings/new",(req,res)=>{//req came from index.ejs
// // //     res.render("listings/new.ejs");
// // // })

// // // //Show Route
// // // app.get("/listings/:id",wrapAsync(async(req,res)=>{
// // //     let {id}=req.params;//we got id
// // //     const listing= await Listing.findById(id).populate("reviews");//populate convert id to full fillings
// // //     res.render("listings/show.ejs",{listing})

// // // }));

// // // //create route
// // // app.post("/listings",validateListing,
// // // wrapAsync(async(req,res,next)=>{
// // //     let result=listingSchema.validate(req.body);
// // //     console.log(result);

// // //    //let{title,description,image,price,country,location}=req.body; or do listing[key name]
   
// // // //    //add erpress error
// // // //    if(!req.body.listing){
// // // //     throw new ExpressError(400,"Send valid Data for Listing");//send post in hopscottch->https://localhost:8080/listings
// // // //    }
// // // //    let listing=req.body.listing;
// // // //    const newListing= new Listing(listing);
// // // // })
// // // // )//hopscotch->/listings=>//post


// // // //2.add wrapAsync suer price->abcd
// // // const newListing=new Listing(req.body.listing);
// // // await newListing.save();
// // // res.redirect("/listings"); 
// // // })
// // // );


// // // //1.custom error handling
// // // // try{
// // // //     const newListing=new Listing(req.body.listing);
// // // //     await newListing.save();
// // // //     res.redirect("/listings");     

// // // // }catch(err){
// // // //     next(err);
// // // // }
// // // // })
// // // // 1.use async//price-abcd//if u comment out app.use then validation error will come
// // // //wrapAsync-better way to write try catch block create utils->wrapasync.js


// // // //validation for schema
// // // //    if(!newListing.description){
// // // //     throw new ExpressError(400,"Description is missing");
// // // //    }
// // // //    if(!newListing.title){
// // // //     throw new ExpressError(400,"title is missing");
// // // //    }
// // // //    if(!newListing.location){
// // // //     throw new ExpressError(400,"location is missing");
// // // //    }
// // // //    if(!newListing.Price){
// // // //     throw new ExpressError(400,"Price is missing");
// // // //    }USE JOI->validate schema(server side validation)
// // // //    await newListing.save();
// // // //    res.redirect("/listings");
// // // //    }
// // // // )
// // // // );

// // // //edit
// // // app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
// // //     let {id}=req.params;//we got id
// // //     const listing= await Listing.findById(id);
// // //     res.render("listings/edit.ejs",{listing});
// // // }));
// // // //update
// // // app.put("/listings/:id",Listing.validate,
// // //  wrapAsync(async (req, res) => {
// // //     if(!req,body.listing){
// // //         throw new ExpressError(400,"Send valid Data for Listing");//send post in hopscottch->https://localhost:8080/listings
// // //        }//eroorExpress
// // //     let { id } = req.params;
// // //     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
// // //     res.redirect(`/listings/${id}`);//updated
// // //   }));

   
// // //   //delete
// // //   app.delete("/listings/:id", wrapAsync(async (req, res) => {
// // //     let { id } = req.params;
// // //     let deletedListing = await Listing.findByIdAndDelete(id);
// // //     console.log(deletedListing);
// // //     res.redirect("/listings");
// // //   }));

// // // app.use("/listings",listings);//router
// //   //reviews
// //   //post
// // //   app.post("/listings/:id/review",validateReview,wrapAsync(async(req,res)=>{
// // //     let listing=await Listing.findById(req.params.id);
// // //     let newReview=new Review(req.body.reviews);
// // //     listing.reviews.push(newReview);
// // //     await newReview.save();
// // //     await listing.save();

// // //     // console.log("new review saved");
// // //     // res.send("new review saved")

// // //     res.redirect(`/listings/${listing._id}`)

// // //   }));



app.post('/listings/:id/review', validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review); // Adjusted to match the schema
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created")
    res.redirect(`/listings/${listing._id}`);
}));


// //   //review-delete
// // //   app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
// // //     let {id,reviewId}=req.params;
// // //     await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
// // //     await Review.findByIdAndDelete(reviewId);

// // //     res.redirect(`/listings/${id}`);

// // //   }) )



app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success"," Review Deleted")
    res.redirect(`/listings/${id}`);
}));


  

// // // app.get("/testListing",async(req,res)=>{
// // //     let sampListing=new Listing({
// // //         title:"My new Villa",
// // //         description:"By the beach",
// // //         price:1200,
// // //         location:"Calangute,Goa",
// // //         country:"India",
// // //     });
// // //     await sampListing.save();
// // //     console.log("sample was saved");
// // //     res.send("succesful testing");
// // // })

app.all("*",(req,res,next)=>{//remain pages
    next(new ExpressError(404,"Page not found"));
})

// // // app.use((err,req,res,next)=>{
// // //     let{statusCode=500,message="something went wrong!"}=err;
// // //     res.render(statusCode).render("error.ejs",{message});
// // //     res.status(statusCode).send(message);
// // // })

// // app.use((err, req, res, next) => {
// //     // const { statusCode = 500, message = "Something went wrong!" } = err;
// //     // res.status(statusCode).render("error.ejs", { message, statusCode });
// //     //res.send("error")->there for only arapAsync and custom error
// //      let {statusCode=500,message="Something went wrong"}=err;//expressError
// //     //  res.render({message});
// //     res.status(statusCode).send(message);//expressError//send ->/listings/random OR send->/random after that update default values of statuscode and msg and go to browser and price->abcfd->listing validn failed//comment out during error.ejs
// // //    res.render("error.ejs",{err})//price->abcd//cmt out then use    res.status(statusCode).render("error.ejs",{message});   //send->/random,/listings/abcd as id

// // });

// // //go to hopscotch->post->/listings go to body

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("server listening on 8080");
})

// // //npm se install karo npm ejs mate for styling
// // //tolocalString:it convert number to string with commasconst express = require("express");









// const express=require("express");
// const app = express();
// const mongoose = require("mongoose");
// const path = require("path");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const ExpressError = require("./utils/ExpressError");
// const listings = require("./routes/listing");
// const reviews = require("./routes/review");

// const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
// mongoose.connect(MONGO_URL)
//     .then(() => {
//         console.log("Connected to DB");
//     })
//     .catch((err) => {
//         console.log("DB connection error:", err);
//     });

// app.engine('ejs', ejsMate);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// app.use(express.static(path.join(__dirname, "/public")));

// app.use("/listings", listings);
// app.use("/listings/:id/reviews", reviews);

// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });

// app.use((err, req, res, next) => {
//     const { statusCode = 500, message = "Something went wrong!" } = err;
//     res.status(statusCode).send(message);
// });

// app.listen(8080, () => {
//     console.log("Server listening on port 8080");
// });




//sonali  //1357