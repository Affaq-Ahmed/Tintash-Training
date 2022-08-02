const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'products.json'
);

const getProductsFromFile = (cb) => {
	fs.readFile(p, (err, fileContent) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(fileContent));
		}
	});
};

module.exports = class Prdouct {
	constructor(_id, _title, _price, _imageURL, _description) {
		this.id = _id;
		this.title = _title;
		this.price = _price;
		this.imageURL = _imageURL;
		this.description = _description;
	}

	save() {
		getProductsFromFile((products) => {
			if (this.id) {
				const existingProductIndex = products.findIndex(
					(product) => product.id === this.id
				);
				const updatedProducts = [...products];
				updatedProducts[existingProductIndex] = this;
				fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
					console.log(err);
				});
			} else {
				this.id = Math.random().toString();
				products.push(this);
				fs.writeFile(p, JSON.stringify(products), (err) => {
					console.log(err);
				});
			}
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}

	static findById(id, cb) {
		getProductsFromFile((products) => {
			const product = products.find((product) => product.id === id);
			cb(product);
		});
	}

	static deleteById(id) {
		getProductsFromFile((products) => {
			const product = products.find((product) => product.id === id);
			const updatedProducts = products.filter((product) => product.id !== id);
			fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
				if (!err) {
					Cart.deleteProduct(id, product.price);
				}
			});
		});
	}
};
