const express = require("express");
const {v4:uuidv4} = require("uuid");
const methodOverride = require("method-override")

const app = express();

const path = require("path");

app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

app.use(express.static("public"));
app.set("public",path.join(__dirname,"/public"));

let port = 8080;

let posts = [
    {
        id : uuidv4(),
        username : "Mukul",
        content : "My new post",
        imgsrc : "mukul.jpg"
    },
    {
        id : uuidv4(),
        username : "Dheer",
        content : "My holi picture",
        imgsrc : "dheer.jpg"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/post/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>p.id===id);
    res.render("edit.ejs",{post});
})

app.get("/posts/create",(req,res)=>{
    res.render("create.ejs");
})

app.post("/posts",(req,res)=>{
    let id = uuidv4();
    let {username,content,imgsrc} = req.body;
    posts.push({id,username,content,imgsrc});
    res.redirect("/posts");
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    newContent = req.body.content;
    post = posts.find((p)=>p.id===id);
    post.content = newContent;
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>p.id!=id);
    res.redirect("/posts");
})

app.get("/",(req,res)=>{
    res.send("app working for get method");
})

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
})