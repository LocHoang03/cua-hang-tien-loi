const express = require('express');
const path = require('path');
const session = require('express-session');
const MSSQLStore = require('connect-mssql')(session);
require('dotenv').config();
const app = express();
const { connect, sql } = require('./models/connect');

const config = {
  user: process.env.user || 'sa',
  password: process.env.password || '123',
  server: process.env.server || 'LAPTOP-FI6VC23H\\SQLEXPRESS',
  database: process.env.name_BD || 'DB_QLCHTL',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  port: 1433,
};

//set view
app.set('view engine', 'ejs');
app.set('views', 'views');

// const shopRouter = require('./routes/shop');
const ErrorRouter = require('./controllers/error');
const authRouter = require('./routes/auth');

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
      maxAge: 10000,
    },
  }),
);

app.use(async (req, res, next) => {
  let quantity = 0,
    count = 0;
  if (!req.session.user) {
    res.locals.textCart = '0 items - 0đ';
    return next();
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
      console.log(data.recordset);
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
  next();
});

//path
// app.use(shopRouter);
app.use('/auth', authRouter);

app.use(ErrorRouter.page404);

app.use((error, req, res, next) => {
  res.status(500).render('500.ejs', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn,
  });
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});
