
const express = require("express");
const app = express();
const bodyParser= require("body-parser");
const port = process.env.PORT || 3000;
const https= require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+"/public"));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signUp.html");
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
               merge_fields:{
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
        auth:"rafa:7db6da013be193decdb17f731af22b08-us13"
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

    app.listen(process.env.PORT||3000, function(){
    console.log("running");
    });

// API key: 7db6da013be193decdb17f731af22b08-us13
// ID list: 







