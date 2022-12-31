const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var path = require('path');
global.__appRoot = path.resolve(__dirname);

 const authRouter = require('./routes/AuthRouter');
// const userRoutes = require('./routes/User');
// const leadRoutes = require('./routes/Lead');
// const adminRoutes = require('./routes/Admin');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.set('strictQuery', false);
//mongodb+srv://FliqaIndia:UxDe62bnBMbP6x7z@fliqaindia.1ry8g.mongodb.net/fliqa-backend
//mongodb://127.0.0.1:27017/fliqa_associate
mongoose.connect('mongodb+srv://FliqaIndia:UxDe62bnBMbP6x7z@fliqaindia.1ry8g.mongodb.net/fliqa-backend', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Mongodb Connected');
    }
});

app.use('/api/auth', authRouter);
// app.use('/api/user', userRoutes);
// app.use('/api/leads', leadRoutes);

app.get('/', (req,res)=>{
    res.send(`FliqaIndia Associate server is up and running`);
})

const port = process.env.PORT||5000;

app.listen(port, ()=>{
    console.log('server started at ' + port);
})
