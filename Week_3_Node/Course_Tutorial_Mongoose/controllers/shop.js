const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
	Product.find()
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
	Product.find()
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
		.populate('cart.items.productId')
		.then((products) => {
			const cartProducts = products.cart.items;
			res.render('shop/cart', {
				docTitle: 'Your Cart',
				path: '/cart',
				products: cartProducts,
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
		.deleteFromCart(productId)
		.then((result) => {
			console.log(result);
			res.redirect('/cart');
		})
		.catch(() => {
			res.redirect('/cart');
		});
};

exports.postCreateOrder = (req, res, next) => {
	req.user
		.populate('cart.items.productId')
		.then((products) => {
			const cartProducts = products.cart.items;
			const order = new Order({
				user: {
					userId: req.user._id,
					name: req.user.name,
				},
				products: cartProducts.map((item) => {
					return {
						product: {
							...item.productId._doc,
						},
						quantity: item.quantity,
					};
				}),
			});
			return order.save();
		})
		.then((result) => {
			req.user.clearCart();
			res.redirect('/orders');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getOrders = (req, res, next) => {
	Order.find({ 'user.userId': req.user._id })
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
