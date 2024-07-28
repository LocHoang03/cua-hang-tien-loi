const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const crypto = require('crypto');
const { connect, sql } = require('../models/connect');
require('dotenv').config();
const transporter = require('../config/mailConfig');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Đăng nhập',
    path: '/auth/login',
    errorMessage: null,
    validationErrors: [],
    oldInput: {
      email: '',
      password: '',
    },
  });
};

exports.getSignUp = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'Đăng ký',
    path: '/auth/signup',
    errorMessage: null,
    validationErrors: [],
    oldInput: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
};

exports.getNewPassword = async (req, res, next) => {
  try {
    const pool = await connect;
    const user = await pool
      .request()
      .input('token', sql.VarChar, req.params.token).query(`SELECT TOP 1 *
            FROM USERS
            WHERE RESET_TOKEN = @token
            AND TOKEN_EXPIRATION > GETDATE()`);

    if (user) {
      res.render('auth/new-password', {
        pageTitle: 'Mật khẩu mới',
        path: '/auth/new-password',
        errorMessage: null,
        validationErrors: [],
        oldInput: {
          password: '',
          confirmPassword: '',
          token: req.params.token,
          userId: user._id.toString(),
        },
      });
    }
  } catch (error) {
    next(new Error(error));
  }
};

exports.getResetPassword = (req, res, next) => {
  res.render('auth/reset-password', {
    pageTitle: 'Lấy lại mật khẩu',
    path: '/auth/reset-password',
    errorMessage: null,
    validationErrors: [],
    oldInput: {
      email: '',
    },
  });
};

exports.getChangePassword = (req, res, next) => {
  res.render('auth/change-password', {
    pageTitle: 'Đổi mật khẩu',
    path: '/auth/change-password',
    errorMessage: null,
    validationErrors: [],
    oldInput: {
      oldPassword: '',
      newPassword: '',
      newConfirmPassword: '',
    },
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      pageTitle: 'Login',
      path: '/auth/login',
      errorMessage: 'Email hoặc mật khẩu không hợp lệ.',
      validationErrors: errors.array(),
      oldInput: {
        email: req.body.email,
        password: req.body.password,
      },
    });
  }

  try {
    const pool = await connect;
    const user = await pool.request().input('email', sql.VarChar, email)
      .query(`SELECT TOP 1 *
            FROM USERS
            WHERE EMAIL = @email`);
    if (!user) {
      return res.status(422).render('auth/login', {
        pageTitle: 'Login',
        path: '/auth/login',
        errorMessage: 'Email hoặc mật khẩu không hợp lệ.',
        validationErrors: errors.array(),
        oldInput: {
          email: req.body.email,
          password: req.body.password,
        },
      });
    }
    const result = await bcrypt.compare(password, user.recordset[0].PASSWORD);
    if (result) {
      req.session.user = user.recordset[0];
      req.session.isLoggedIn = true;
      res.cookie('sessionId', req.sessionID, { maxAge: 3600000 });
      return req.session.save((err) => {
        console.error(err);
        res.redirect('/');
      });
    } else {
      return res.status(422).render('auth/login', {
        pageTitle: 'Login',
        path: '/auth/login',
        errorMessage: 'Email hoặc mật khẩu không hợp lệ.',
        validationErrors: errors.array(),
        oldInput: {
          email: req.body.email,
          password: req.body.password,
        },
      });
    }
  } catch (error) {
    next(new Error(error));
  }
};

exports.postSignup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      pageTitle: 'Signup',
      path: '/auth/signup',
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
      oldInput: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      },
    });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 12);

    const pool = await connect;
    const user = await pool
      .request()
      .input('Name', sql.NVarChar, name)
      .input('Email', sql.NVarChar, email)
      .input('Password', sql.NVarChar, hashPassword)
      .input('ROLE', sql.NVarChar, 'user').query(`
      INSERT INTO USERS (NAME, EMAIL, PASSWORD, ROLE)
      OUTPUT INSERTED.USER_ID AS UserId
      VALUES (@Name, @Email, @Password, @ROLE)
    `);

    const userId = user.recordset[0].UserId;
    await pool.request().input('UserId', sql.Int, userId).query(`
        INSERT INTO CARTS (USER_ID)
        VALUES (@UserId)
      `);

    res.redirect('/auth/login');
    return transporter.sendMail({
      from: `${process.env.EMAIL_USERNAME}`,
      to: email,
      subject: 'Signup success',
      html: '<h1> Congratulations, you have successfully registered an account </h1>',
    });
  } catch (error) {
    console.log(error);
    next(new Error(error));
  }
};

exports.postChangePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/change-password', {
      pageTitle: 'Đổi mật khẩu',
      path: '/auth/change-password',
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
      oldInput: {
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
        newConfirmPassword: req.body.newConfirmPassword,
      },
    });
  }

  try {
    const pool = await connect;
    const result = await pool
      .request()
      .input('UserId', sql.Int, userId)
      .query('SELECT * FROM USERS WHERE USER_ID = @UserId');

    const user = result.recordset[0];

    if (!user) {
      return res.status(422).render('auth/change-password', {
        pageTitle: 'Đổi mật khẩu',
        path: '/auth/change-password',
        errorMessage: 'Người dùng không tìm thấy.',
        validationErrors: [],
        oldInput: { oldPassword, newPassword, newConfirmPassword },
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.Password);

    if (!isMatch) {
      return res.status(422).render('auth/change-password', {
        pageTitle: 'Đổi mật khẩu',
        path: '/auth/change-password',
        errorMessage: 'Mật khẩu cũ không đúng.',
        validationErrors: [],
        oldInput: { oldPassword, newPassword, newConfirmPassword },
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await pool
      .request()
      .input('UserId', sql.Int, userId)
      .input('Password', sql.NVarChar, hashedPassword)
      .query('UPDATE Users SET Password = @Password WHERE Id = @UserId');

    res.redirect('/');
  } catch (error) {
    res.status(422).render('auth/change-password', {
      pageTitle: 'Đổi mật khẩu',
      path: '/auth/change-password',
      errorMessage: 'Đã xảy ra lỗi vui lòng thực hiện lại sau!',
      validationErrors: [],
      oldInput: { oldPassword, newPassword, newConfirmPassword },
    });
  }
};

exports.postReset = async (req, res, next) => {
  const token = crypto.randomBytes(32).toString('hex');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/reset-password', {
      pageTitle: 'Lấy lại mật khẩu',
      path: '/auth/reset-password',
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
      oldInput: {
        email: req.body.email,
      },
    });
  }

  try {
    const pool = await connect;

    const userResult = await pool
      .request()
      .input('Email', sql.NVarChar, req.body.email)
      .query('SELECT * FROM USERS WHERE EMAIL = @Email');

    const user = userResult.recordset[0];

    if (!user) {
      return res.status(422).render('auth/reset-password', {
        pageTitle: 'Lấy lại mật khẩu',
        path: '/auth/reset-password',
        errorMessage: 'Email chưa được đăng ký hoặc không tồn tại',
        validationErrors: errors.array(),
        oldInput: {
          email: req.body.email,
        },
      });
    }

    await pool
      .request()
      .input('Email', sql.NVarChar, req.body.email)
      .input('ResetToken', sql.NVarChar, token)
      .input('TokenExpiration', sql.BigInt, Date.now() + 900000).query(`
        UPDATE USERS
        SET RESET_TOKEN = @ResetToken, TOKEN_EXPIRATION = @TokenExpiration
        WHERE EMAIL = @Email
      `);

    await transporter.sendMail({
      from: 'hoangphuocloc.phurieng@gmail.com',
      to: req.body.email,
      subject: 'Reset Password',
      html: `
        <p>You requested a password reset</p>
        <p>Click this <a href="http://localhost:8080/auth/new-password/${token}">link</a> to set a new password.</p>
      `,
    });

    res.redirect('/auth/login');
  } catch (err) {
    next(new Error(err));
  }
};

exports.postNewPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/new-password', {
      pageTitle: 'Mật khẩu mới',
      path: '/auth/new-password',
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
      oldInput: {
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        token: req.body.token,
        userId: req.body.userId,
      },
    });
  }

  try {
    const pool = await connect;

    const result = await pool
      .request()
      .input('ResetToken', sql.NVarChar, req.body.token)
      .input('UserId', sql.Int, req.body.userId)
      .input('CurrentDate', sql.BigInt, Date.now()).query(`
        SELECT * FROM USERS
        WHERE RESET_TOKEN = @ResetToken
          AND USER_ID = @UserId
          AND TOKEN_EXPIRATION > @CurrentDate
      `);

    const user = result.recordset[0];

    if (!user) {
      return res.status(422).render('auth/new-password', {
        pageTitle: 'Mật khẩu mới',
        path: '/auth/new-password',
        errorMessage: 'Người dùng không tồn tại hoặc token không hợp lệ!',
        validationErrors: errors.array(),
        oldInput: {
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
          token: req.body.token,
          userId: req.body.userId,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    await pool
      .request()
      .input('UserId', sql.Int, req.body.userId)
      .input('Password', sql.NVarChar, hashedPassword).query(`
        UPDATE USERS
        SET PASSWORD = @Password,
            RESET_TOKEN = NULL,
            TOKEN_EXPIRATION = NULL
        WHERE USER_ID = @UserId
      `);

    res.redirect('/auth/login');
  } catch (err) {
    next(new Error(err));
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
};
