const express = require('express');
const morgan = require('morgan');
const appDebug = require('debug')('app:debug');

const student_router = require('./routers/students');
const connectDB = require('./db/connect');
const port = process.env.PORT || 3000;
connectDB('mongodb://localhost:27017/CrudDB');
const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/students',student_router);

app.listen(port , () => appDebug(`Listening on ${port}....`));