const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
require('dotenv').config();
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
// const cookieParser = require('cookie-parser');

const app = express();

// const csrfProtection = csrf({ cookie: true });

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
});

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 30; i++) {
      let randomIndex = Math.floor(Math.random() * charactersLength);
      result += randomIndex;
    }
    cb(null, result + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('image/png') ||
    file.mimetype.includes('image/jpg') ||
    file.mimetype.includes('image/jpeg')
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const shopRouter = require('./routes/shop');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const ErrorRouter = require('./controllers/error');
const User = require('./models/user');
console.log(process.env.NODE_ENV);

// const LogStream = fs.createWriteStream( path.join(__dirname, 'access.log'), { flags: 'a' });

// app.use(helmet());
// app.use(compression());
// app.use(morgan('combined', {stream: LogStream}))
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  multer({ storage: multerStorage, fileFilter: fileFilter }).single('image'),
);

// app.use(csrfProtection);

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 3600000, // 1 giờ (1 giờ = 3600 giây)
    },
  }),
);

// Đặt tiêu đề để ngăn trình duyệt lưu trữ trang trong cache
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});

app.use((req, res, next) => {
  let quantity = 0,
    count = 0;
  price = 0;
  if (!req.session.user) {
    res.locals.textCart = '0 items - 0đ';
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      const nameUser =
        user.name && user.name.split(' ').length > 0
          ? user.name.split(' ')[user.name.split(' ').length - 1]
          : '';
      res.locals.name = nameUser;
      return user.populate('cart.items.productId');
    })
    .then((user) => {
      return user.cart.items.map((item) => {
        count += 1;
        quantity += item.quantity;
        price += item.quantity * item.productId.price;
      });
    })
    .then((result) => {
      res.locals.textCart = `${quantity} items - ${price}đ`;
      res.locals.quantity = quantity;
      res.locals.price = price;
      let fee = 0;
      if (count > 0) {
        fee = 15000 + 5000 * Math.floor((count - 1) / 3);
      }
      res.locals.count = fee;
      req.fee = fee;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (user.isAdmin) {
        res.locals.isAdmin = true;
        return next();
      }
      res.locals.isAdmin = false;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  // res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(shopRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

app.use(ErrorRouter.page404);

app.use((error, req, res, next) => {
  res.status(500).render('500.ejs', {
    pageTitle: 'Error!',
    path: '/500',
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    console.log('connect success');
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => {
    console.log('err-db: ', err);
  });
