const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const  path = require("path");
const hbs =require("hbs");
require("../src/db/conn");
const validator = require("validator");
const MernCollection = require("../src/models/register")
const bcrypt = require("bcryptjs");


const static_path = path.join(__dirname,"../public");
const view_path = path.join(__dirname,"../templete/views");
const partials_path = path.join(__dirname,"../templete/partials");



app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views", view_path);
hbs.registerPartials(partials_path);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res)=>{
    res.render("index");
})

app.post("/register", async (req,res)=>
{
    try{
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if(password==cpassword){
            const addUser = new MernCollection({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                cpassword:req.body.cpassword

            })
            const addedUser = await addUser.save();
            res.status(201).render("login");
            
        }
        else{
            res.send("Password are not matching!")
        }
        }
        catch(err){
            res.status(400).send(err);
        }
    })

app.get("/login", (req,res)=>{
    res.render("login");
})


app.post("/dashboard", async (req,res)=>{
    try{
        const name = req.body.name;
        const password = req.body.password;
        const username = await MernCollection.findOne({
            name:name
        });
        const isMatch = await bcrypt.compare(password,username.password);
    

        if (isMatch){
            res.status(201).send(`Welcome ${name}. This is your dashboard!`)
        }
        else{
            res.send("Your Password is Incorrect");
        }
    }
    catch(err){
        res.status(400).send("Invalid Email")
    }

})

app.listen(port,()=>{
    console.log(`Server connecting at port : ${port}`);
})