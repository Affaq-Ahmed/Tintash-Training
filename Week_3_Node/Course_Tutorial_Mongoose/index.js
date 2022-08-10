const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');

const rootDir = require('./util/path');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
	User.findById('62f27ac2a5b44d09fb546e6c')
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', errorController.get404);

mongoose
	.connect(
		'mongodb+srv://Affaq:Affaq165@mycluster.ryf6a.mongodb.net/shop?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('Connected to MongoDB!');
		app.listen(3000);
	})
	.catch((err) => console.log(err));
