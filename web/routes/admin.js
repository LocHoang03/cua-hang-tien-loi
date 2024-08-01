const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { body, check } = require('express-validator');
const auth = require('../middleware/is-auth');

router.get('/', auth.isAuth, adminController.getProducts);
router.get('/add-product', auth.isAuth, adminController.getAddProduct);
router.get(
  '/edit-product/:productId',
  auth.isAuth,
  adminController.getEditProduct
);
router.get('/add-type', auth.isAuth, adminController.getAddType);
router.get('/list-type', auth.isAuth, adminController.getListType);
router.get('/edit-type/:typeId', auth.isAuth, adminController.getEditType);
router.get('/:typeProduct', auth.isAuth, adminController.getTypeProducts);
router.post(
  '/add-product',
  [
    body('title', 'Vui lòng nhập tên sản phẩm!(Ít nhất 3 ký tự.)')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price', 'Vui lòng nhập giá!').isFloat(),
    body('type', 'Vui lòng nhập loại sản phẩm!')
      .isString()
      .isLength({ min: 1 })
      .trim(),
  ],
  auth.isAuth,
  adminController.postAddProduct
);

router.post(
  '/edit-product',
  [
    body('title', 'Vui lòng nhập tên sản phẩm!(Ít nhất 3 ký tự.)')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price', 'Vui lòng nhập giá!').isFloat(),
  ],
  auth.isAuth,
  adminController.postEditProduct
);

router.post(
  '/edit-type',
  [
    body('nametype', 'Vui lòng nhập loại tên!(Ít nhất 3 ký tự.)')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('vntype', 'Vui lòng nhập tên loại tiếng việt!(Ít nhất 3 ký tự.)')
      .isString()
      .isLength({ min: 3 })
      .trim(),
  ],
  auth.isAuth,
  adminController.postEditType
);

router.post(
  '/add-type',
  [
    body('nametype', 'Vui lòng nhập loại tên!(Ít nhất 3 ký tự.)')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('vntype', 'Vui lòng nhập tên loại tiếng việt!(Ít nhất 3 ký tự.)')
      .isString()
      .isLength({ min: 3 })
      .trim(),
  ],
  auth.isAuth,
  adminController.postTypeProduct
);

router.post('/delete-product', auth.isAuth, adminController.postDeleteProduct);

router.post('/delete-type', auth.isAuth, adminController.postDeleteType);

module.exports = router;
