const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname+"/date.js")

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.set("view engine", "ejs")                                  


let allItems = ["Buy Food", "Cook Food", "Eat Food"]
let workItems = []

app.get("/", function (req, res) {
   let day= date.getDay()
   res.render("list", { listTitle: "Today is "+day, newListItems: allItems })   
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
})
app.get("/work", function(req,res){
    res.render("list", {listTitle: "WorkList", newListItems: workItems})
})

app.post("/work", function(req,res){
    let inp = req.body.newItem
    workItems.push(inp)
    res.redirect("/work")
})
app.get("/about", function(req,res){
res.render("about")
})
app.listen(3000, function () {
    console.log("server started at port 3000")
})
