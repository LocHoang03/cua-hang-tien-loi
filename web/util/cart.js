const { connect, sql } = require('../models/connect');

async function addToCart(user, product) {
  const pool = await connect;

  try {
    const userId = user.USER_ID;
    const productId = product.PRODUCT_ID;

    const cartIdResult = await pool
      .request()
      .input('userId', sql.Int, userId)
      .query(`SELECT CART_ID FROM CARTS WHERE USER_ID = @userId`);

    const cartId = cartIdResult.recordset[0].CART_ID;

    const cartProductResult = await pool
      .request()
      .input('cartId', sql.Int, cartId)
      .input('productId', sql.Int, productId).query(`
        SELECT * FROM CART_PRODUCTS 
        WHERE CART_ID = @cartId AND PRODUCT_ID = @productId
      `);

    if (cartProductResult.recordset.length > 0) {
      const newQuantity = cartProductResult.recordset[0].QUANTITY + 1;
      await pool
        .request()
        .input('cartId', sql.Int, cartId)
        .input('productId', sql.Int, productId)
        .input('quantity', sql.Int, newQuantity).query(`
          UPDATE CART_PRODUCTS 
          SET QUANTITY = @quantity 
          WHERE CART_ID = @cartId AND PRODUCT_ID = @productId
        `);
    } else {
      await pool
        .request()
        .input('cartId', sql.Int, cartId)
        .input('productId', sql.Int, productId)
        .input('quantity', sql.Int, 1).query(`
          INSERT INTO CART_PRODUCTS (CART_ID, PRODUCT_ID, QUANTITY) 
          VALUES (@cartId, @productId, @quantity)
        `);
    }
  } catch (err) {
    throw new Error('Adding product to cart failed.');
  }
}

async function deleteCartItem(user, product) {
  const pool = await connect;
  try {
    const cartIdResult = await pool
      .request()
      .input('userId', sql.Int, user.USER_ID)
      .query(`SELECT CART_ID FROM CARTS WHERE USER_ID = @userId`);
    const cartId = cartIdResult.recordset[0].CART_ID;

    await pool
      .request()
      .input('cartId', sql.Int, cartId)
      .input('productId', sql.Int, product.PRODUCT_ID).query(`
        DELETE FROM CART_PRODUCTS 
        WHERE CART_ID = @cartId AND PRODUCT_ID = @productId
      `);
  } catch (err) {
    throw new Error('Removing product from cart failed.');
  }
}

async function increaseQuantity(user, product) {
  const pool = await connect;
  try {
    const cartIdResult = await pool
      .request()
      .input('userId', sql.Int, user.USER_ID)
      .query(`SELECT CART_ID FROM CARTS WHERE USER_ID = @userId`);
    const cartId = cartIdResult.recordset[0].CART_ID;

    const cartProductResult = await pool
      .request()
      .input('cartId', sql.Int, cartId)
      .input('productId', sql.Int, product.PRODUCT_ID).query(`
        SELECT * FROM CART_PRODUCTS 
        WHERE CART_ID = @cartId AND PRODUCT_ID = @productId
      `);

    if (cartProductResult.recordset.length > 0) {
      const newQuantity = cartProductResult.recordset[0].QUANTITY + 1;
      await pool
        .request()
        .input('cartId', sql.Int, cartId)
        .input('productId', sql.Int, product.PRODUCT_ID)
        .input('quantity', sql.Int, newQuantity).query(`
          UPDATE CART_PRODUCTS 
          SET QUANTITY = @quantity 
          WHERE CART_ID = @cartId AND PRODUCT_ID = @productId
        `);
    } else {
      console.log('Product not found in cart.');
    }
  } catch (err) {
    throw new Error('Increasing product quantity failed.');
  }
}

async function decreaseQuantity(user, product) {
  const pool = await connect;
  try {
    const cartIdResult = await pool
      .request()
      .input('userId', sql.Int, user.USER_ID)
      .query(`SELECT CART_ID FROM CARTS WHERE USER_ID = @userId`);
    const cartId = cartIdResult.recordset[0].CART_ID;

    const cartProductResult = await pool
      .request()
      .input('cartId', sql.Int, cartId)
      .input('productId', sql.Int, product.PRODUCT_ID).query(`
        SELECT * FROM CART_PRODUCTS 
        WHERE CART_ID = @cartId AND PRODUCT_ID = @productId
      `);

    if (cartProductResult.recordset.length > 0) {
      const newQuantity = cartProductResult.recordset[0].QUANTITY - 1;
      if (newQuantity === 0) {
        await deleteCartItem(user, product);
      } else {
        const result = await pool
          .request()
          .input('cartId', sql.Int, cartId)
          .input('productId', sql.Int, product.PRODUCT_ID)
          .input('quantity', sql.Int, newQuantity).query(`
            UPDATE CART_PRODUCTS 
            SET QUANTITY = @quantity 
            WHERE CART_ID = @cartId AND PRODUCT_ID = @productId
          `);
      }
    } else {
      console.log('Product not found in cart.');
    }
  } catch (err) {
    throw new Error('Decreasing product quantity failed.');
  }
}

async function clearCart(user) {
  const pool = await connect;
  try {
    const cartIdResult = await pool
      .request()
      .input('userId', sql.Int, user.USER_ID)
      .query(`SELECT CART_ID FROM CARTS WHERE USER_ID = @userId`);
    const cartId = cartIdResult.recordset[0].CART_ID;

    await pool
      .request()
      .input('cartId', sql.Int, cartId)
      .query(`DELETE FROM CART_PRODUCTS WHERE CART_ID = @cartId`);
  } catch (err) {
    throw new Error('Clearing cart failed.');
  }
}

// update cart

async function getUserCart(userId) {
  let pool = await connect;
  let result = await pool
    .request()
    .input('userId', sql.Int, userId)
    .query('SELECT * FROM CARTS WHERE USER_ID = @userId');

  if (result.recordset.length === 0) {
    return null;
  }
  return result.recordset[0].CART_ID;
}

async function updateUserCart(userId, orderData) {
  const cartId = await getUserCart(userId);
  if (cartId) {
    let pool = await connect;
    let promises = orderData.map((order) => {
      return pool
        .request()
        .input('cartId', sql.Int, cartId)
        .input('productId', sql.Int, order.PRODUCT_ID)
        .input('quantity', sql.Int, order.QUANTITY)
        .query(`INSERT INTO CART_PRODUCTS (CART_ID, PRODUCT_ID, QUANTITY) 
                VALUES (@cartId, @productId, @quantity)`);
    });

    await Promise.all(promises);
  }
}

module.exports = {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  deleteCartItem,
  addToCart,
  getUserCart,
  updateUserCart,
};
