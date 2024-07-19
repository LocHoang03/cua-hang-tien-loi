const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');
const auth = require('../middleware/is-auth');

router.get('/', shopController.getHomeShop);
router.get('/news', shopController.getNewsShop);
router.get('/introduces', shopController.getIntroducesShop);
router.get('/introduces/loi-ngo', shopController.getPrefaceShop);
router.get('/introduces/phuong-cham', shopController.getMottoShop);
router.get('/contact', shopController.getContactShop);
router.get('/products', shopController.getProductsShop);
router.get('/detail-product/:productId', shopController.getDetailProduct);
router.get('/products/:typeProduct', shopController.getTypeProductsShop);
router.get('/cart', auth.isAuth, shopController.getCart);
router.get('/order', auth.isAuth, shopController.getOrder);
router.get('/invoice/:orderId', shopController.getInvoice);
router.post('/cart', auth.isAuth, shopController.postCart);
router.post(
  '/repurchase-product',
  auth.isAuth,
  shopController.postRepurchaseProduct
);
router.get('/search-products', shopController.SearchProducts);
router.post('/search-products', shopController.SearchProducts);
router.patch(
  '/increase-quantity/:productId',
  auth.isAuth,
  shopController.postIncreaseCartItem
);
router.patch(
  '/decrease-quantity/:productId',
  auth.isAuth,
  shopController.postDecreaseCartItem
);

router.delete(
  '/delete-cart-item/:productId',
  auth.isAuth,
  shopController.postDeleteCartItem
);

router.delete(
  '/delete-full-cart-item',
  auth.isAuth,
  shopController.postDeleteAllCartItem
);

router.post('/create-checkout-session', shopController.createCheckout);
module.exports = router;
