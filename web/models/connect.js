const sql = require('mssql/msnodesqlv8');

const config = {
  user: process.env.user || 'sa',
  password: process.env.password || '123',
  server: process.env.server || 'LAPTOP-FI6VC23H\\SQLEXPRESS',
  database: process.env.name_BD || 'DB_QLCHTL',
  driver: 'msnodesqlv8',
};

const connect = new sql.ConnectionPool(config).connect().then((pool) => {
  return pool;
});

module.exports = {
  connect,
  sql,
};
