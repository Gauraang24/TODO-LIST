

const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname+"/date.js")

const app = express()

app.use(bodyParser.urlencoded({extended:true}))                //to access inside body
app.use(express.static("public"))                              //to access static files in express like css or images 

app.set("view engine", "ejs")                                  //for ejs


let allItems = ["Buy Food", "Cook Food", "Eat Food"]
let workItems = []

app.get("/", function (req, res) {

   let day= date.getDay()

    res.render("list", { listTitle: "Today is "+day, newListItems: allItems })    //EJS syntax for res.write

})

app.post("/", function(req,res){ 
    let inp = req.body.newItem
    console.log(req.body)

    if(req.body.ButtonNo1=="WorkList"){
        workItems.push(inp)
        res.redirect("/work") 
    }else{
        allItems.push(inp)
        res.redirect("/")  
    }

    

    // res.redirect("/")   //we cannot write res.render 2 times, therefore we mention in single link with comma like above, and then use res.redirect
})


app.get("/work", function(req,res){
    res.render("list", {listTitle: "WorkList", newListItems: workItems})
})

app.post("/work", function(req,res){
    let inp = req.body.newItem
    // console.log(inp)

    workItems.push(inp)
    res.redirect("/work")
})



app.get("/about", function(req,res){
res.render("about")
})



app.listen(3000, function () {
    console.log("server started at port 3000")
})


// app.get("/", function (req, res) {
//     let today = new Date()
//     let currentDay = today.getDay()

//     if (currentDay === 6 || currentDay === 0) {
//         res.sendFile(__dirname + "/weekend.html")
//     } else {
//         res.sendFile(__dirname + "/weekday.html")
//     }
// })









// let currentDay = today.getDay()
//     let day = ""

    // if (currentDay === 6 || currentDay === 0) {
    //     day = "holiday"
    // } else {
    //     day = "weekday"
    // }
    // res.render("list", {kindOfDay: day})

    // switch (currentDay) {
    //     case 0:
    //         day = "Sunday"
    //         break;
    //     case 1:
    //         day = "Monday"
    //         break;
    //     case 2:
    //         day = "Tuesday"
    //         break;
    //     case 3:
    //         day = "Wedday"
    //         break;
    //     case 4:
    //         day = "Thursday"
    //         break;
    //     case 5:
    //         day = "Friday"
    //         break;
    //     case 6:
    //         day = "Saturday"
    //         break;

    //     default:
    //         console.log("Error: current day is equal to: "+ currentDay)
    //         break;
    // }