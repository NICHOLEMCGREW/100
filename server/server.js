const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const methodOverride = require('method-override')
const flash = require('express-flash')
const logger = require('morgan')
const cors = require('cors')
const connectDB = require('../config/.env')

//Use .env file in config folder
require('dotenv').config({ path: "../config/.env"})

//Connect To Database
connectDB()

app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true
}));

//Static Folder
app.use(express.static("frontend/build"))

//Body Parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Logging
app.use(logger("dev"))

//Use forms for put / delete
app.use(methodOverride("_method"))

// Setup Sessions - stored in MongoDB
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false, 
        store: new MongoStore({ mongooseConnection: mongoose.connection}),
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Use flash messages for errors, info, ect...
app.use(flash())

//Setup Routes For Which The Server Is Listening
app.use('/', mainRoutes)
app.use('api/post', postRoutes)
app.use('/api/comment', commentRoutes)

app.use('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'))
})

//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${port}`)
})