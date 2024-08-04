const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const auth = require('../middleware/is-auth');
const { body, check } = require('express-validator');
const { connect, sql } = require('../models/connect');

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignUp);
router.get('/new-password', authController.getNewPassword);
router.get('/reset-password', authController.getResetPassword);
router.get('/information', authController.getChangePassword);

router.post('/logout', auth.isAuth, authController.postLogout);

router.post(
  '/change-password',
  [
    body(
      'oldPassword',
      'Vui lòng nhập mật khẩu hiện tại chỉ có số và văn bản và ít nhất 6 ký tự.',
    )
      .isAlphanumeric()
      .withMessage()
      .isLength({ min: 6 })
      .trim(),
    body(
      'newPassword',
      'Vui lòng nhập mật khẩu mới chỉ có số và văn bản và ít nhất 6 ký tự.',
    )
      .isAlphanumeric()
      .withMessage()
      .isLength({ min: 6 })
      .trim(),
    body('newConfirmPassword').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Xác nhận mật khẩu không khớp');
      }
      return true;
    }),
  ],
  auth.isAuth,
  authController.postChangePassword,
);

router.get('/new-password/:token', authController.getNewPassword);

router.post(
  '/new-password',
  [
    body(
      'password',
      'Vui lòng nhập mật khẩu chỉ có số và văn bản và ít nhất 6 ký tự.',
    )
      .isAlphanumeric()
      .withMessage()
      .isLength({ min: 6 })
      .trim(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Xác nhận mật khẩu không khớp');
      }
      return true;
    }),
  ],
  authController.postNewPassword,
);

router.post(
  '/reset',
  [
    check('email')
      .isEmail()
      .withMessage('Vui lòng nhập email!')
      .normalizeEmail(),
  ],
  authController.postReset,
);

router.post(
  '/login',
  [
    check('email')
      .isEmail()
      .withMessage('Vui lòng nhập email!')
      .normalizeEmail(),
    body(
      'password',
      'Vui lòng nhập mật khẩu chỉ có số và văn bản và ít nhất 6 ký tự.',
    )
      .isAlphanumeric()
      .withMessage()
      .isLength({ min: 6 })
      .trim(),
  ],
  authController.postLogin,
);

router.post(
  '/signup',
  [
    body('name', 'Vui lòng nhập tên của bạn!(Ít nhất 3 ký tự.)')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    check('email')
      .isEmail()
      .withMessage('Vui lòng nhập email!')
      .custom(async (value, { req }) => {
        const pool = await connect;
        const user = await pool
          .request()
          .input('userId', sql.Int, value)
          .query(`SELECT * FROM USERS a WHERE USER_ID = @userId`);
        if (user.recordset.length > 0) {
          return Promise.reject(
            'E-mail đã tồn tại, vui lòng chọn một email khác.',
          );
        }
      })
      .normalizeEmail(),
    body('phone', 'Vui lòng nhập số điện thoại!').isMobilePhone(),
    body('address', 'Vui lòng nhập địa chỉ giao hàng!').isString().trim(),
    body(
      'password',
      'Vui lòng nhập mật khẩu chỉ có số và văn bản và ít nhất 6 ký tự.',
    )
      .isAlphanumeric()
      .withMessage()
      .isLength({ min: 6 })
      .trim(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Xác nhận mật khẩu không khớp');
      }
      return true;
    }),
  ],
  authController.postSignup,
);

router.post(
  '/change-information',
  [
    body('name', 'Vui lòng nhập tên của bạn!(Ít nhất 3 ký tự.)')
      .isString()
      .isLength({ min: 3 })
      .trim(),

    body('phone', 'Vui lòng nhập số điện thoại!')
      .isMobilePhone()
      .custom(async (value, { req }) => {
        const pool = await connect;
        const user = await pool
          .request()
          .input('phone', sql.NVarChar, value)
          .input('userId', sql.Int, req.body.userId)
          .query(
            `SELECT * FROM USERS a WHERE PHONE = @phone AND USER_ID != @userId`,
          );
        if (user.recordset.length > 0) {
          return Promise.reject(
            'Số điện thoại đã tồn tại vui lòng nhập số điện thoại khác!!',
          );
        }
      }),
    body('address', 'Vui lòng nhập địa chỉ giao hàng!').isString().trim(),
  ],
  authController.postChangeInformation,
);

module.exports = router;
