const Product = require('../models/product');

const ObjectId = require('mongodb').ObjectID;

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		docTitle: 'Add Product',
		path: '/admin/add-product',
		editMode: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const { title, price, imageUrl, description } = req.body;
	const product = new Product(
		title,
		price,
		description,
		imageUrl,
		null,
		req.user._id
	);
	product.save();

	res.redirect('/admin/products');
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	const productId = req.params.productId;
	Product.findById(productId)
		.then((product) => {
			if (!product) {
				return res.redirect('/');
			}
			res.render('admin/edit-product', {
				docTitle: 'Edit Product',
				path: '/admin/edit-product',
				product: product,
				editMode: editMode,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postEditProduct = (req, res, next) => {
	const { title, price, imageUrl, description, productId } = req.body;

	const product = new Product(
		title,
		price,
		description,
		imageUrl,
		new ObjectId(productId)
	);
	product.save();
	res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			res.render('admin/products', {
				products: products,
				docTitle: 'Admin Products',
				path: '/admin/products',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postDeleteProduct = (req, res, next) => {
	const productId = req.body.productId;

	Product.deleteById(productId)
		.then((result) => {
			console.log('DESTROYED PRODUCT');
			res.redirect('/admin/products');
		})
		.catch((err) => {
			console.log(err);
		});
};
