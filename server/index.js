const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./router/router');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session(
    {
    resave : false,
    saveUninitialized : false,
    secret : "Hello",
    cookie: {
        secure: false
      },
    }
))

app.use(passport.initialize());
app.use(passport.session());

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth',router);

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));;


app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})