const express = require('express');
const path = require('path');
const session = require('express-session');
const MSSQLStore = require('connect-mssql-v2');
require('dotenv').config();
const app = express();
const { connect, sql } = require('./models/connect');
const { formatCurrency } = require('./util/formatPrice');

const config = {
  user: process.env.user || 'sa',
  password: process.env.password || '123',
  server: process.env.server || 'MSI\\SQLEXPRESS',
  database: process.env.name_BD || 'DB_QLCHTL',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

//set view
app.set('view engine', 'ejs');
app.set('views', 'views');

const shopRouter = require('./routes/shop');
const ErrorRouter = require('./controllers/error');
const authRouter = require('./routes/auth');
const { options } = require('pdfkit');

//middleware body form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// file static public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: new MSSQLStore(config),
    cookie: {
      maxAge: 3600000,
      secure: false,
    },
  }),
);

app.use(async (req, res, next) => {
  let quantity = 0,
    count = 0;
  price = 0;
  if (!req.session.user) {
    res.locals.textCart = '0 items - 0đ';
    return next();
  }

  try {
    const pool = await connect;

    const userResult = await pool
      .request()
      .input('UserId', sql.Int, req.session.user.USER_ID)
      .query('SELECT * FROM USERS WHERE USER_ID = @UserId');

    if (userResult.recordset.length === 0) {
      return next(new Error('User not found'));
    }
    const user = userResult.recordset[0];
    req.user = user;
    const nameUser =
      user &&
      user.NAME &&
      typeof user.NAME === 'string' &&
      user.NAME.trim().length > 0
        ? user.NAME.split(' ').pop()
        : '';
    res.locals.name = nameUser;

    const cartResult = await pool
      .request()
      .input('UserId', sql.Int, user.USER_ID).query(`
        SELECT b.*, c.PRICE FROM CARTS a
        JOIN CART_PRODUCTS b ON a.CART_ID = b.CART_ID
        JOIN PRODUCTS c ON b.PRODUCT_ID = c.PRODUCT_ID
        WHERE a.USER_ID = @UserId
      `);
    cartResult.recordset.forEach((item) => {
      count += 1;
      quantity += item.QUANTITY;
      price += item.QUANTITY * item.PRICE;
    });

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
  } catch (err) {
    next(new Error(err));
  }
});

app.use(async (req, res, next) => {
  if (!req.session.userId) {
    return next();
  }

  try {
    const pool = await connect;

    const data = await pool
      .request()
      .input('id', sql.Int, req.session.userId)
      .query(`SELECT * FROM USERS WHERE USER_ID = @id`);
    if (data.recordset.length > 0) {
      req.user = data.recordset[0];
      next();
    } else {
      next(new Error(err));
    }
  } catch (err) {
    next(new Error(err));
  }
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.isAdmin = req.user ? req.user.isAdmin : false;
  res.locals.formatCurrency = formatCurrency;
  next();
});

//path
app.use(shopRouter);
app.use('/auth', authRouter);

// app.use(ErrorRouter.page404);

// app.use((error, req, res, next) => {
//   res.status(500).render('500.ejs', {
//     pageTitle: 'Error!',
//     path: '/500',
//     isAuthenticated: req.session.isLoggedIn,
//   });
// });

app.listen(4000, () => {
  console.log('listening on port 4000');
});
