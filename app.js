const express = require("express");
const app = express();
const bodyParser= require("body-parser");
const port = 3000;
const https= require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    var firstName = req.body.fname;
    var lastName =req.body.lname;
    var email= req.body.email;
   
    var data ={
        members:[
            {
               email_address: email, 
               status:"subscribed", 
               marge_fields:{
                FNAME:firstName,
                LNAME:lastName
               }  
            }
        ]
    }
    var jasonData= JSON.stringify(data);
    const url= "https://us13.api.mailchimp.com/3.0/lists/882ae4327c";
    const options= {
        method:"post",
        auth:"rafa1:ad883b9da9d5dae85e2dad4fc2d20665-us13"
    }
    const request= https.request(url,options, function(response){

        if(response.statusCode ===200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
        console.log(JSON.parse(data));
        });
     });
 
 request.write(jasonData);
 request.end();
    
});

app.post("/failure", function(req, res){
    res.redirect("/");
})

    app.listen(process.env.PORT || 3000, function(){
    console.log("running");
    });

// API key: ad883b9da9d5dae85e2dad4fc2d20665-us13
// ID list: 







