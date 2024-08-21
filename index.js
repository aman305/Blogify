const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const checkForAuthenticationCookie = require('./middlewares/authentication');
mongoose
  .connect('mongodb://localhost:27017/blogify')
  .then((e) => console.log('MongoDB connected'));

const app = express();
const PORT = 8000;
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRoute);
app.use(checkForAuthenticationCookie('token'));
app.get('/', (req, res) => {
  res.render('home', {
    user: req.user,
  });
});

app.listen(PORT, () => console.log('Server started on port ' + PORT));
