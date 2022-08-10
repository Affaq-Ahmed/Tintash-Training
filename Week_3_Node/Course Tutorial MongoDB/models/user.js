const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

class User {
	constructor(_username, _email, _id, _cart) {
		this.name = _username;
		this.email = _email;
		this.cart = _cart;
		this._id = _id;
	}

	save() {
		const db = getDb();
		return db.collection('users').insertOne(this);
	}

	addToCart(product) {
		const db = getDb();

		const cartProduct = this.cart.items.findIndex((cp) => {
			return cp.productId.toString() === product._id.toString();
		});
		let newQuantity = 1;
		const updatedCartItems = [...this.cart.items];

		if (cartProduct >= 0) {
			newQuantity = this.cart.items[cartProduct].quantity + 1;
			updatedCartItems[cartProduct].quantity = newQuantity;
		} else {
			updatedCartItems.push({
				productId: new ObjectId(product._id),
				quantity: newQuantity,
			});
		}

		const updatedCart = {
			items: updatedCartItems,
		};

		return db
			.collection('users')
			.updateOne(
				{ _id: new ObjectId(this._id) },
				{ $set: { cart: updatedCart } }
			);
	}

	getCart() {
		const db = getDb();
		return db
			.collection('products')
			.find({ _id: { $in: this.cart.items.map((i) => i.productId) } })
			.toArray()
			.then((products) => {
				return products.map((p) => {
					return {
						...p,
						quantity: this.cart.items.find((i) => {
							return i.productId.toString() === p._id.toString();
						}).quantity,
					};
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	deleteCartItem(productId) {
		const db = getDb();
		const updatedCartItems = this.cart.items.filter((item) => {
			return item.productId.toString() !== productId.toString();
		});
		const updatedCart = { items: updatedCartItems };
		return db
			.collection('users')
			.updateOne(
				{ _id: new ObjectId(this._id) },
				{ $set: { cart: { items: updatedCartItems } } }
			);
	}

	addOrder() {
		const db = getDb();
		return this.getCart()
			.then((products) => {
				const order = {
					items: products,
					user: {
						_id: new ObjectId(this._id),
						name: this.name,
					},
				};
				return db.collection('orders').insertOne(order);
			})
			.then((result) => {
				this.cart = { items: [] };
				return db
					.collection('users')
					.updateOne(
						{ _id: new ObjectId(this._id) },
						{ $set: { cart: { items: [] } } }
					);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	getOrders() {
		const db = getDb();
		return db
			.collection('orders')
			.find({ 'user._id': new ObjectId(this._id) })
			.toArray();
	}

	static findById(userId) {
		const db = getDb();
		return db.collection('users').findOne({ _id: new ObjectId(userId) });
	}
}

module.exports = User;
