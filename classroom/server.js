const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const cookieParser=require("cookie-parser");

app.use(cookieParser("secret"));


app.get("/getsignedcookie",(req,res)=>{
    res.cookie("cookie","india",{signed:true});
    res.send("signed cookie get")
})

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("verified")

})


app.get("/getcookies",(req,res)=>{
    res.cookie("greet","hi");
    res.cookie("greet1","hi1");
    res.send("cookie sent");// /getcookies open console tab go to appln then cookie
})

app.get("/greet",(req,res)=>{
    let {name="anonymous"}=req.cookies;
    res.send(`Hi,${name}`);
})

app.get("/",(req,res)=>{
    console.dir(req.cookie);
    res.send("hi");
})



app.use("/users",users);
app.use("/posts",posts);//common path->map to user file
//users
//index
// app.get("/users",(req,res)=>{
//     res.send("GET for users");
// })

// //show-users
// app.get("/users/:id",(req,res)=>{
//     res.send("GET for showusers id");
// })

// //post-users
// app.post("/users", (req, res) => {
//     res.send("POST for users");
// });

// //delete
// app.delete("/users/:id",(req,res)=>{
//     res.send("delete for users id");
// })

app.listen(3000,()=>{
  console.log("listening 3000")
})

// //posts
// //index
// app.get("/posts",(req,res)=>{
//     res.send("GET for post");
// })

// //show-users
// app.get("/posts/:id",(req,res)=>{
//     res.send("GET for posts id");
// })

// //post-users
// app.post("/posts", (req, res) => {
//     res.send("POST for posts");
// });

// //delete
// app.delete("/posts/:id",(req,res)=>{
//     res.send("delete for post id");
// })