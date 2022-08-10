const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		docTitle: 'Add Product',
		path: '/admin/add-product',
		editMode: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const { title, price, imageUrl, description } = req.body;
	const product = new Product({
		title: title,
		price: price,
		imageUrl: imageUrl,
		description: description,
		userId: req.user._id,
	});

	product.save();
	console.log('CREATED PRODUCT');
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

	Product.findById(productId)
		.then((product) => {
			product.title = title;
			product.price = price;
			product.imageUrl = imageUrl;
			product.description = description;
			return product.save();
		})
		.then((result) => {
			console.log('UPDATED PRODUCT');
			res.redirect('/admin/products');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProducts = (req, res, next) => {
	Product.find()
		.then((products) => {
			console.log(products);
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

	Product.deleteOne({ _id: productId })
		.then((result) => {
			console.log('DELETED PRODUCT');
			res.redirect('/admin/products');
		})
		.catch((err) => {
			console.log(err);
		});
};
