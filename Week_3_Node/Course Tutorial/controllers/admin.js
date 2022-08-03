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
	req.user
		.createProduct({
			title: title,
			price: price,
			imageUrl: imageUrl,
			description: description,
		})
		.then((result) => {
			console.log('Created product...');
			res.redirect('/admin/products');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	const productId = req.params.productId;
	req.user
		.getProducts({ where: { id: productId } })
		// Product.findByPk(productId)
		.then((products) => {
			const product = products[0];
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

	Product.findByPk(productId)
		.then((products) => {
			product.title = title;
			product.price = price;
			product.imageUrl = imageUrl;
			product.description = description;
			product.userId = req.user.id;
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
	req.user
		.getProducts()
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
	Product.findByPk(productId)
		.then((product) => {
			return product.destroy();
		})
		.then((result) => {
			console.log('DESTROYED PRODUCT');
			res.redirect('/admin/products');
		})
		.catch((err) => {
			console.log(err);
		});
	res.redirect('/admin/products');
};
