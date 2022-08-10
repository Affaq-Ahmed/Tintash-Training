const router = require('express').Router();

const shopController = require('../controllers/shop');

// / => GET
router.get('/', shopController.getIndex);

// /products => GET
router.get('/products', shopController.getProducts);

router.get('/products/:id', shopController.getProduct);

// // /cart => GET
router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteItem);

router.post('/create-order', shopController.postCreateOrder);

// // /orders => GET
router.get('/orders', shopController.getOrders);

module.exports = router;
