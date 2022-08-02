const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
	const products = Product.fetchAll((products) => {
		res.render('shop/product-list', {
			products: products,
			docTitle: 'All Products',
			path: '/products',
		});
	});
};

exports.getProduct = (req, res, next) => {
	const productId = req.params.id;
	Product.findById(productId, (product) => {
		res.render('shop/product-detail', {
			product: product,
			docTitle: 'Product Detail',
			path: '/products',
		});
	});
};

exports.getIndex = (req, res, next) => {
	const products = Product.fetchAll((products) => {
		res.render('shop/index', {
			products: products,
			docTitle: 'Shop',
			path: '/',
		});
	});
};

exports.getCart = (req, res, next) => {
	Cart.getProducts((cart) => {
		Product.fetchAll((products) => {
			const cartProducts = [];
			products.forEach((product) => {
				const cartProductData = cart.products.find(
					(prod) => prod.id === product.id
				);
				if (cartProductData) {
					cartProducts.push({ productData: product, qty: cartProductData.qty });
				}
			});
			res.render('shop/cart', {
				docTitle: 'Your Cart',
				path: '/cart',
				products: cartProducts,
			});
		});
	});
};

exports.postCart = (req, res, next) => {
	const productId = req.body.productId;
	Product.findById(productId, (product) => {
		Cart.addProduct(productId, product.price);
		res.redirect('/cart');
	});
};

exports.postCartDeleteItem = (req, res, next) => {
	const productId = req.body.productId;
	console.log(req.body);
	Product.findById(productId, (product) => {
		console.log(product);
		Cart.deleteProduct(productId, product.price);
		res.redirect('/cart');
	});
};

exports.getOrders = (req, res, next) => {
	res.render('shop/orders', {
		docTitle: 'Your Orders',
		path: '/orders',
	});
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		docTitle: 'Checkout',
		path: '/checkout',
	});
};
