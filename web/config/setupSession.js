const session = require('express-session');
const MSSQLStore = require('connect-mssql')(session);
const { connect, sql } = require('../models/connect'); // Đảm bảo đường dẫn đúng

const setup = async (app) => {
  try {
    const poolPromise = await connect;

    const store = new MSSQLStore({
      pool: poolPromise,
      table: 'SESSIONS',
    });

    app.use(
      session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
          maxAge: 10000,
          secure: false,
        },
      }),
    );

    console.log('Session store setup successfully');
  } catch (err) {
    console.error('Failed to setup session store:', err);
  }
};

module.exports = setup;
