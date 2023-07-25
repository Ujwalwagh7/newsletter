const express = require("express");
const bodyParser = require("body-parser");
const Request = require("request");
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/succesfull.html");
});

app.post("/", function(req, res) {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const ename = req.body.ename;
    var data = {
        members: [{
            email_address: ename,
            status :"subscribed",
            merge_fields: {
                FNAME : firstname,
                LNAME : lastname              //merged field for object
            }

        }]

    };

    var jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/d7e174ae67";
    const option = {
        method :"POST",
        auth : "ujwal1:d08a3b6b70697691178ea4a5b8991e6c-us9"
    }

   const request = https.request(url, option, function(response) {
   	if (response.statusCode=== 200) {
   		res.sendFile(__dirname+"/sucessfull.html");}

   		else{
res.sendFile(__dirname+"/failure.html");

   		}
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end(); 


});

app.post("/failure",function(req,res)
{
res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
    console.log("this port is sort 3000");
});


// api key
// e1ba050175586fc1e6389106612ea8e2-us9

// listen
// d7e174ae67
//d7e174ae67