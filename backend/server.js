const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config();

const authMiddleware = require('./middleware/auth')

const authRoutes = require('./routes/auth');


const app = express();


app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

// app.use(express.static(path.join(__dirname, '../sr')))

const PORT = process.env.PORT || 5000;

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {})
    .then( () => app.listen(PORT, () =>  console.log(`server on ${PORT}`)))
    .catch((err) => console.log(err))