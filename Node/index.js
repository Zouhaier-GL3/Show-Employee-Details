const express = require('express');
const morgan = require('morgan');
const appDebug = require('debug')('app:debug');

const student_router = require('./routers/students');
const employee_router = require('./routers/employee');

const connectDB = require('./db/connect');
const port = process.env.PORT || 3000;
connectDB('mongodb://localhost:27017/employee');
const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/students',student_router);
app.use('/api/employee',employee_router);

app.listen(port , () => appDebug(`Listening on ${port}....`));