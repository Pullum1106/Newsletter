const express = require("express")
const request = require("request")

const https = require("https")

const app = express()

app.use(express.static("public"))
app.use(express.urlencoded())
app.use(express.json())


app.get("/", function(req, res){

    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){

    var firstName = req.body.fName
    var lastName = req.body.lName
    var eMail = req.body.Email
    const listId = "53e5d024cf"


    const data = {
        members: [
            {
                email_address: eMail,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/"+ listId

    const options = {
        method: "POST", 
        auth: "text or name :a083694ba7f436a2fe63c760d0c0d117-us21" 
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end()
})

app.post("/success", function(req, res){
    res.redirect("/")
})

app.post("/failure", function(res, req){
    res.redirect("/")
})


app.listen(3000, function(){
    console.log("The server is running on port 3000");
})