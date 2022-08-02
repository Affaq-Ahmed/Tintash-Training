const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		docTitle: 'Add Product',
		path: '/admin/add-product',
		editMode: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const { title, price, imageURL, description } = req.body;
	const product = new Product(null, title, price, imageURL, description);
	product.save();
	res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	const productId = req.params.productId;
	Product.findById(productId, (product) => {
		if (!product) {
			return res.redirect('/');
		}
		res.render('admin/edit-product', {
			docTitle: 'Edit Product',
			path: '/admin/edit-product',
			product: product,
			editMode: editMode,
		});
	});
};

exports.postEditProduct = (req, res, next) => {
	const { title, price, imageURL, description, productId } = req.body;
	const updatedProduct = new Product(
		productId,
		title,
		price,
		imageURL,
		description
	);
	updatedProduct.save();
	res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
	const products = Product.fetchAll((products) => {
		res.render('admin/products', {
			products: products,
			docTitle: 'Admin Products',
			path: '/admin/products',
		});
	});
};

exports.postDeleteProduct = (req, res, next) => {
	const productId = req.body.productId;
	Product.deleteById(productId);
	res.redirect('/admin/products');
};
