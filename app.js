// todo - 1. learn nodejs as quickly as possible

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
// express
const app = express();

// mongodb uri
const dbURI =
	'mongodb+srv://freak:freak101@learningnode.cux5t.mongodb.net/LearningNode?retryWrites=true&w=majority';

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => app.listen(3000))
	.catch((err) => console.log(err));

// register view
app.set('view engine', 'ejs');
//app.set('view','views'); not necessaryy because /views folder is set as default

// middleware and static files
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(morgan('dev'));

//! _________ All the routes handling ________

app.get('/', (req, res) => {
	//*	res.send('<p>Hey here I am</p>'); sending simple html markup as response
	//* res.sendFile('./views/index.html', { root: __dirname }); used when rendering an html file
	res.redirect('/blogs');
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/create', (req, res) => {
	res.render('blogs/create');
});

//! _________ handling the mongodb blogs _______
app.use('/blogs', blogRoutes);

//* // redirecting to about page route
//* app.get('/about-us', (req, res) => {
//* 	res.redirect('./about');
//* });

//// always at the bottom so that if route from above matches then 404 page
app.use((req, res) => {
	res.status(404).render('404');
});
