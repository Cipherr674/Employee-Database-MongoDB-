const express = require('express');
const app = express();
const morgan = require('morgan');

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Public'));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


const nav = [
    { link: '/server/data', name: 'Home' }, 
    { link: '/server/form', name: 'Add Employee' }
];


require('dotenv').config();
require('./db/connection');


const employeeroutes = require('./Router/server');
app.use('/server', employeeroutes(nav));





app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
