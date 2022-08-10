const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			res.render('shop/product-list', {
				docTitle: 'All Products',
				path: '/products',
				products: products,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProduct = (req, res, next) => {
	const productId = req.params.id;
	Product.findById(productId)
		.then((product) => {
			res.render('shop/product-detail', {
				product: product,
				docTitle: 'Product Detail',
				path: '/products',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			res.render('shop/index', {
				docTitle: 'Shop',
				path: '/',
				products: products,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCart = (req, res, next) => {
	req.user
		.getCart()
		.then((products) => {
			res.render('shop/cart', {
				docTitle: 'Your Cart',
				path: '/cart',
				products: products,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postCart = (req, res, next) => {
	const productId = req.body.productId;
	Product.findById(productId)
		.then((product) => {
			return req.user.addToCart(product);
		})
		.then((result) => {
			res.redirect('/cart');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postCartDeleteItem = (req, res, next) => {
	const productId = req.body.productId;
	req.user
		.deleteCartItem(productId)
		.then((result) => {
			console.log(result);
			res.redirect('/cart');
		})
		.catch(() => {
			res.redirect('/cart');
		});
};

exports.postCreateOrder = (req, res, next) => {
	let fetchedCart;
	req.user
		.addOrder()
		.then((result) => {
			res.redirect('/orders');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getOrders = (req, res, next) => {
	req.user
		.getOrders()
		.then((orders) => {
			res.render('shop/orders', {
				docTitle: 'Your Orders',
				path: '/orders',
				orders: orders,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		docTitle: 'Checkout',
		path: '/checkout',
	});
};
