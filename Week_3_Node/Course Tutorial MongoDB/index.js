const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const rootDir = require('./util/path');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
	User.findById('62f0aced6b6ca5e91574e042')
		.then((user) => {
			req.user = new User(user.name, user.email, user._id, user.cart);
			next();
		})
		.catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', errorController.get404);

mongoConnect(() => {
	app.listen(3000);
});
