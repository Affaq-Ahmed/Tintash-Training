const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	userId:{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
// 	constructor(_title, _price, _description, _imageUrl, _id, userId) {
// 		this.title = _title;
// 		this.price = _price;
// 		this.description = _description;
// 		this.imageUrl = _imageUrl;
// 		this._id = _id;
// 		this.userId = userId;
// 	}

// 	save() {
// 		const db = getDb();
// 		let dbOp;
// 		if (this._id) {
// 			dbOp = db
// 				.collection('products')
// 				.updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
// 		} else {
// 			dbOp = db.collection('products').insertOne(this);
// 		}
// 		dbOp
// 			.then((result) => {
// 				console.log(result);
// 				return result;
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}

// 	static fetchAll() {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.find()
// 			.toArray()
// 			.then((products) => {
// 				return products;
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	}

// 	static findById(productId) {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.find({ _id: new mongodb.ObjectId(productId) })
// 			.next()
// 			.then((product) => {
// 				console.log(product);
// 				return product;
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	}

// 	static deleteById(productId) {
// 		const db = getDb();
// 		console.log(productId);
// 		return db
// 			.collection('products')
// 			.deleteOne({ _id: new mongodb.ObjectId(productId) })
// 			.then((result) => {
// 				console.log(result);
// 				return result;
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	}
// }

// module.exports = Product;
