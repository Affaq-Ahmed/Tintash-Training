const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL =
	'mongodb+srv://Affaq:Affaq165@mycluster.ryf6a.mongodb.net/shop?retryWrites=true&w=majority';

let _db;

const mongoConnect = (callback) => {
	MongoClient.connect(connectionURL)
		.then((client) => {
			console.log('Connected to MongoDB!');
			_db = client.db();
			callback();
		})
		.catch((error) => {
			console.log(error);
			throw err;
		});
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
