
const mongoose = require("mongoose");
const initData = require("./data"); // Ensure the correct path
const Listing = require("../models/listing"); // Ensure the correct path



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


const initDB = async () => {
    try {
        await Listing.deleteMany({}); // Delete previous information//cleaning db
        initData.data =initData.data.map((obj)=>({...obj,owner:"666b0e18c7ab356ad33cbd4f"}))
        await Listing.insertMany(initData.data); // Fix the typo.data present as obj in data.js
        console.log("Data initialized");
    } catch (err) {
        console.error("Error initializing data:", err);
    }
};

// Call the main function to connect to the database and initialize data
initDB();
