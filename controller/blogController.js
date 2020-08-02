const Blog = require('../models/blogs');

const blog_index = (req, res) => {
	Blog.find()
		.sort({ createdAt: -1 })
		.then((result) => res.render('blogs/index', { blogs: result }))
		.catch((err) => console.log(err));
};

const blog_delete = (req, res) => {
	const id = req.params.id;
	Blog.findByIdAndDelete(id)
		.then((data) => res.json({ redirect: '/blogs' }))
		.catch((err) => console.log(err));
};

const blog_details = (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.then((result) => res.render('blogs/details', { blog: result }))
		.catch((err) => res.status(404).render('404'));
};

const blog_create_post = (req, res) => {
	const blog = new Blog(req.body);
	blog
		.save()
		.then(() => res.redirect('/blogs'))
		.catch((err) => console.log(err));
};

module.exports = {
	blog_index,
	blog_delete,
	blog_details,
	blog_create_post,
};
