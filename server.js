const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT || 5000

const connectDB = require("./database/db")
connectDB()


const userRoute = require("./routes/userRoutes")



app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use("/api/users", userRoute)
app.get("/api", (req, res) => {
    res.json({message: "Welcome to my server"});
})







app.listen (PORT, () => {
console.log("Server started succesfully")
});