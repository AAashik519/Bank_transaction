
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const accountRoutes = require('./routes/account.route');
const cookieParser = require('cookie-parser');
const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/accounts', accountRoutes);





module.exports = app;