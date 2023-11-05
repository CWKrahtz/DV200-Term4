require('dotenv/config')
const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const QuestionRoutes = require('./routes/questions')
const CommentRoutes = require('./routes/comments')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

//Used with React()
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(QuestionRoutes)
app.use(CommentRoutes)

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/questionImages", express.static("questionImages"))

app.use('/userImages', express.static("userImages"))

app.use(userRoutes)
app.use(authRoutes)
//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Whirlpool' //Collection Name
}).then(() => {
    console.log("Connected to DB")
}).catch((err) => {
    console.log("No connection. Error: " + err)
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log("Server Started On Port: ", PORT)
})