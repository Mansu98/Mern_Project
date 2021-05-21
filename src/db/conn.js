const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/MERNproject",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then (()=>{
    console.log("Connection Successful");
}).catch(()=>{
    console.log("Connection Unsuccessful");

})




