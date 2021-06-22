import express from "express";

// @types/express
const app = express();

app.get("/test", (req, res) => {
    return res.send("Olá NLW")
})

app.post("/test-post", (req, res) => {
    return res.send("Olá NLW método POST")
})

// http://localhost:3000
app.listen(3000, () => console.log("Server is running"));