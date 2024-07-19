const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const crypto = require('crypto');

const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: process.env.SENGRID_KEY,
    },
  })
);

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

exports.getNewPassword = (req, res, next) => {
  console.log('params ps', req.params);
  User.findOne({
    resetToken: req.params.token,
    tokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      console.log('user new ps: ', user);
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
    })
    .catch((err) => {
      console.log(err);
      next(new Error(err));
    });
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

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('error', errors.array());
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

  User.findOne({ email: email })
    .then((user) => {
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
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            console.log('result: ', result);
            req.session.user = user;
            req.session.isLoggedIn = true;
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
        })
        .catch((err) => {
          console.log(err);
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
        });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('error', errors.array());
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
        // isAdmin: false
      },
    });
  }
  bcrypt
    .hash(password, 12)
    .then((password) => {
      const user = new User({
        name: name,
        email: email,
        password: password,
        isAdmin: false,
        cart: {
          items: [],
        },
      });
      return user.save();
    })
    .then((result) => {
      res.redirect('/auth/login');
      return transporter.sendMail({
        from: 'hoangphuocloc.phurieng@gmail.com',
        to: email,
        subject: 'Signup success',
        html: '<h1> Congratulations, you have successfully registered an account </h1>',
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.postChangePassword = (req, res, next) => {
  console.log(req.user);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('error', errors.array());
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
  let newUser;
  User.findOne({
    _id: req.user._id,
  })
    .then((user) => {
      console.log('user new ps', user);
      if (!user) {
        return res.status(422).render('auth/change-password', {
          pageTitle: 'Đổi mật khẩu',
          path: '/auth/change-password',
          errorMessage: 'Đã xảy ra lỗi vui lòng thực hiện lại sau!!',
          validationErrors: errors.array(),
          oldInput: {
            oldPassword: req.body.oldPassword,
            newPassword: req.body.newPassword,
            newConfirmPassword: req.body.newConfirmPassword,
          },
        });
      }
      newUser = user;
      bcrypt
        .compare(req.body.oldPassword, user.password)
        .then((result) => {
          if (!result) {
            return res.status(422).render('auth/change-password', {
              pageTitle: 'Đổi mật khẩu',
              path: 'auth/change-password',
              errorMessage: 'Thông tin mật khẩu không hợp lệ.',
              validationErrors: errors.array(),
              oldInput: {
                oldPassword: req.body.oldPassword,
                newPassword: req.body.newPassword,
                newConfirmPassword: req.body.newConfirmPassword,
              },
            });
          }
          console.log(result);
          return bcrypt.hash(req.body.newPassword, 12);
        })
        .then((hashPW) => {
          newUser.password = hashPW;
          return newUser.save();
        })
        .then((result) => {
          res.redirect('/');
        })
        .catch((err) => {
          console.log(err);
          return res.status(422).render('auth/change-password', {
            pageTitle: 'Đổi mật khẩu',
            path: 'auth/change-password',
            errorMessage: 'Thông tin mật khẩu không hợp lệ.',
            validationErrors: errors.array(),
            oldInput: {
              oldPassword: req.body.oldPassword,
              newPassword: req.body.newPassword,
              newConfirmPassword: req.body.newConfirmPassword,
            },
          });
        });
    })
    .catch((err) => {
      console.log(err);
      next(new Error(err));
    });
};

exports.postReset = (req, res, next) => {
  console.log('email -reset', req.body.email);
  crypto.randomBytes(32, (err, buf) => {
    if (err) {
      console.log(err);
      return res.redirect('/auth/reset');
    }
    const token = buf.toString('hex');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('error', errors.array());
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

    User.findOne({ email: req.body.email })
      .then((user) => {
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
        user.resetToken = token;
        user.tokenExpiration = Date.now() + 900000;
        return user.save();
      })
      .then((result) => {
        res.redirect('/auth/login');
        transporter.sendMail({
          from: 'hoangphuocloc.phurieng@gmail.com',
          to: req.body.email,
          subject: 'Reset Password',
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:8080/auth/new-password/${token}">link</a> to set a new password.</p>
          `,
        });
      })
      .catch((err) => {
        console.log(err);
        next(new Error(err));
      });
  });
};

exports.postNewPassword = (req, res, next) => {
  console.log('postNewPassword', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('error', errors.array());
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

  let newUser;
  User.findOne({
    resetToken: req.body.token,
    _id: req.body.userId,
    tokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      console.log('user new ps', user);
      if (!user) {
        return res.status(422).render('auth/new-password', {
          pageTitle: 'Mật khẩu mới',
          path: '/auth/new-password',
          errorMessage: 'Người dùng không tồn tại !!',
          validationErrors: errors.array(),
          oldInput: {
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            token: req.body.token,
            userId: req.body.userId,
          },
        });
      }
      newUser = user;
      return bcrypt.hash(req.body.password, 12);
    })
    .then((hashPW) => {
      (newUser.password = hashPW),
        (newUser.resetToken = undefined),
        (newUser.tokenExpiration = undefined);
      return newUser.save();
    })
    .then((result) => {
      res.redirect('/auth/login');
    })
    .catch((err) => {
      console.log(err);
      next(new Error(err));
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    // next(new Error(err))
    res.redirect('/');
  });
};
