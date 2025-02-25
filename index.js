let express=require('express');
let app=express();
let bodyparser=require('body-parser');
const passport = require("./middleware");
app.use(bodyparser.urlencoded({extended:true}))
const session = require("express-session");


app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



app.get("/",(req,res)=>{
    res.render("index.ejs");
})
// Facebook Callback Route
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);
app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { 
      scope: ["email"], 
      authType: "reauthenticate" // Forces account selection
    })
  );
app.get("/profile", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }
    res.send(`Welcome, ${req.user.displayName}`);
  });
app.listen(1000);