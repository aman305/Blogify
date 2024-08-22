const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const cookieParser = require('cookie-parser');
const Blog = require('./models/blog');
const checkForAuthenticationCookie = require('./middlewares/authentication');
mongoose
  .connect('mongodb://localhost:27017/blogify')
  .then((e) => console.log('MongoDB connected'));

const app = express();
const PORT = 8001;
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));
app.use('/user', userRoute);
app.use('/blog', blogRoute);
app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render('home', {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(PORT, () => console.log('Server started on port ' + PORT));
