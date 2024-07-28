// const Product = require('../models/product');
// const Type = require('../models/type');
// const Order = require('../models/order');
const pdfDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { connect, sql } = require('../models/connect');
const { validationResult } = require('express-validator');
const { request } = require('http');
const { response } = require('express');
const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteCartItem,
  clearCart,
} = require('../util/cart');

exports.getHomeShop = async (req, res, next) => {
  try {
    const pool = await connect;
    const quantityType = await pool
      .request()
      .query(`SELECT COUNT(*) as 'QuantityType' FROM TYPE_PRODUCTS a `);
    let products = [];
    for (let i = 1; i <= quantityType.recordset[0].QuantityType; i++) {
      const product = await pool.request().query(
        `SELECT TOP 4 * 
        FROM PRODUCTS a 
        JOIN TYPE_PRODUCTS b ON a.TYPE_ID = b.TYPE_ID 
        WHERE b.TYPE_ID = ${i}
        ORDER BY a.TITLE ASC`,
      );
      products.push(product.recordset);
    }
    res.render('shop/home', {
      pageTitle: 'Trang chủ',
      path: '/',
      productsAll: products,
    });
  } catch (err) {
    next(new Error(err));
  }
};

exports.getNewsShop = (req, res, next) => {
  const newsCompanyBuffer = fs.readFileSync(
    path.join(__dirname, '../data/json/newsCompany.json'),
    'utf8',
  );
  const newsCompany = JSON.parse(newsCompanyBuffer);

  const ResponsibilityBuffer = fs.readFileSync(
    path.join(__dirname, '../data/json/responsibility.json'),
    'utf8',
  );
  const Responsibility = JSON.parse(ResponsibilityBuffer);
  res.render('shop/news', {
    pageTitle: 'Tin tức',
    path: '/news',
    companys: newsCompany,
    responsibility: Responsibility,
  });
};

exports.getIntroducesShop = (req, res, next) => {
  const arr1Buffer = fs.readFileSync(
    path.join(__dirname, '../data/json/arr1-Introduce.json'),
    'utf8',
  );
  const arr1 = JSON.parse(arr1Buffer);

  const arr2Buffer = fs.readFileSync(
    path.join(__dirname, '../data/json/arr2-Introduce.json'),
    'utf8',
  );
  const arr2 = JSON.parse(arr2Buffer);
  res.render('shop/introduce/introduces', {
    pageTitle: 'Về NextStore',
    path: '/introduces',
    path1: '/introduces',
    arr1: arr1,
    arr2: arr2,
  });
};

exports.getPrefaceShop = (req, res, next) => {
  const arr3Buffer = fs.readFileSync(
    path.join(__dirname, '../data/json/preface.json'),
    'utf8',
  );
  const arr3 = JSON.parse(arr3Buffer);

  res.render('shop/introduce/preface', {
    pageTitle: 'Lời ngỏ',
    path: '/introduces',
    path1: '/introduces/loi-ngo',
    arr3: arr3,
  });
};

exports.getMottoShop = (req, res, next) => {
  const mottoBuffer = fs.readFileSync(
    path.join(__dirname, '../data/json/motto.json'),
    'utf8',
  );
  const motto = JSON.parse(mottoBuffer);
  res.render('shop/introduce/motto', {
    pageTitle: 'Phương châm',
    path: '/introduces',
    path1: '/introduces/phuong-cham',
    motto: motto,
  });
};

exports.getContactShop = (req, res, next) => {
  res.render('shop/contact', {
    pageTitle: 'Liên hệ',
    path: '/contact',
  });
};

const PER_ITEM_PAGE = 12;
exports.getProductsShop = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let totalItem, products, types;

    const pool = await connect;

    const totalResult = await pool
      .request()
      .query(`SELECT COUNT(*) as 'count' FROM PRODUCTS`);
    totalItem = totalResult.recordset[0].count;

    const productsResult = await pool.request().query(`
        SELECT * FROM PRODUCTS
        ORDER BY PRODUCT_ID
        OFFSET ${(page - 1) * PER_ITEM_PAGE} ROWS
        FETCH NEXT ${PER_ITEM_PAGE} ROWS ONLY
      `);

    products = productsResult.recordset;

    const typesResult = await pool
      .request()
      .query(`SELECT * FROM TYPE_PRODUCTS`);
    types = typesResult.recordset;
    res.render('shop/products/products', {
      pageTitle: 'Sản Phẩm',
      path: '/products',
      path1: '/products',
      types: types,
      detail: undefined,
      type: undefined,
      searchProduct: undefined,
      products: products,
      adminEdit: false,
      currentPage: page,
      hasNextPage: PER_ITEM_PAGE * page < totalItem,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItem / PER_ITEM_PAGE),
    });
  } catch (error) {
    next(new Error(error));
  }
};

exports.getTypeProductsShop = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let totalItem, products, types, idType;

    const pool = await connect;

    const typesResult = await pool
      .request()
      .query(`SELECT * FROM TYPE_PRODUCTS`);
    types = typesResult.recordset;

    for (let i = 0; i < types.length; i++) {
      if (types[i].FLAG === req.params.typeProduct) {
        idType = types[i].TYPE_ID;
        break;
      }
    }

    const totalResult = await pool
      .request()
      .input('idType', sql.Int, idType)
      .query(`SELECT COUNT(*) as count FROM PRODUCTS WHERE TYPE_ID = @idType`);
    totalItem = totalResult.recordset[0].count;

    const productsResult = await pool.request().input('idType', sql.Int, idType)
      .query(`
        SELECT * FROM PRODUCTS
        WHERE TYPE_ID = @idType
        ORDER BY PRODUCT_ID
        OFFSET ${(page - 1) * PER_ITEM_PAGE} ROWS
        FETCH NEXT ${PER_ITEM_PAGE} ROWS ONLY
      `);
    products = productsResult.recordset;

    res.render('shop/products/products', {
      pageTitle: `${req.params.typeProduct} Product`,
      path: '/products',
      path1: `/products/${req.params.typeProduct}`,
      types: types,
      type: req.params.typeProduct,
      products: products,
      adminEdit: false,
      detail: undefined,
      searchProduct: undefined,
      currentPage: page,
      hasNextPage: PER_ITEM_PAGE * page < totalItem,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItem / PER_ITEM_PAGE),
    });
  } catch (error) {
    next(new Error(error));
  }
};

exports.getDetailProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const typeProduct = req.params.typeProduct;
    let types, idType, product;
    const pool = await connect;

    const typesResult = await pool
      .request()
      .query(`SELECT * FROM TYPE_PRODUCTS`);
    types = typesResult.recordset;

    for (let i = 0; i < types.length; i++) {
      if (types[i].FLAG === typeProduct) {
        idType = types[i].TYPE_ID;
        break;
      }
    }

    const productResult = await pool
      .request()
      .input('PRODUCT_ID', sql.Int, productId)
      .query(`SELECT * FROM PRODUCTS WHERE PRODUCT_ID = @PRODUCT_ID`);
    product = productResult.recordset[0];

    res.render('shop/products/detail-product', {
      pageTitle: 'Chi tiết sản phẩm',
      path: '/detail-product',
      path1: '/detail-product',
      detail: true,
      product: product,
      types: types,
      adminEdit: false,
    });
  } catch (error) {
    next(new Error(error));
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const userId = req.user.USER_ID;
    let products = [];

    const pool = await connect;

    const cartResult = await pool
      .request()
      .input('userId', sql.Int, userId)
      .query(`SELECT CART_ID FROM CARTS WHERE USER_ID = @userId`);
    const cartId = cartResult.recordset[0].CART_ID;

    const productsResult = await pool.request().input('cartId', sql.Int, cartId)
      .query(`
        SELECT p.* ,cp.QUANTITY
        FROM CART_PRODUCTS cp
        JOIN PRODUCTS p ON cp.PRODUCT_ID = p.PRODUCT_ID
        WHERE cp.CART_ID = @cartId
      `);
    products = productsResult.recordset;

    res.render('shop/products/cart', {
      pageTitle: 'My Cart',
      path: '/cart',
      products: products,
    });
  } catch (error) {
    next(new Error(error));
  }
};

exports.postCart = async (req, res, next) => {
  let countProd = 0;
  let priceProd = 0;

  try {
    const productId = req.body.id;
    const pool = await connect;

    const productResult = await pool
      .request()
      .input('productId', sql.Int, productId)
      .query(`SELECT * FROM PRODUCTS WHERE PRODUCT_ID = @productId`);

    const product = productResult.recordset[0];
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await addToCart(req.user, product);

    const cartResult = await pool
      .request()
      .input('userId', sql.Int, req.user.USER_ID).query(`
        SELECT cp.QUANTITY, p.PRICE
        FROM CART_PRODUCTS cp
        JOIN PRODUCTS p ON cp.PRODUCT_ID = p.PRODUCT_ID
        WHERE cp.CART_ID = (SELECT CART_ID FROM CARTS WHERE USER_ID = @userId)
      `);

    const cartItems = cartResult.recordset;
    cartItems.forEach((item) => {
      countProd += item.QUANTITY;
      priceProd += item.QUANTITY * item.PRICE;
    });

    res.status(200).json({
      message: 'Success!',
      countProd: countProd,
      priceProd: priceProd,
    });
  } catch (err) {
    res.status(500).json({ message: 'Adding product to cart failed.' });
  }
};

exports.postDeleteAllCartItem = async (req, res, next) => {
  let countProd = 0,
    priceProd = 0,
    count = 0,
    fee = 0;

  try {
    await clearCart(req.user);

    res.status(200).json({
      message: 'Success!',
      countProd: countProd,
      priceProd: priceProd,
      count: count,
      fee: fee,
    });
  } catch (err) {
    res.status(500).json({ message: 'Clearing cart failed.' });
    console.log(err);
  }
};

exports.postDeleteCartItem = async (req, res, next) => {
  let countProd = 0,
    priceProd = 0,
    count = 0,
    fee = 0;

  try {
    const pool = await connect;

    const productResult = await pool
      .request()
      .input('productId', sql.Int, req.params.productId)
      .query(`SELECT * FROM PRODUCTS WHERE PRODUCT_ID = @productId`);

    const product = productResult.recordset[0];
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await deleteCartItem(req.user, product);

    const cartResult = await pool
      .request()
      .input('userId', sql.Int, req.user.id).query(`
        SELECT cp.*, p.PRICE FROM CART_PRODUCTS cp
        JOIN PRODUCTS p ON cp.PRODUCT_ID = p.PRODUCT_ID
        WHERE cp.CART_ID = (SELECT CART_ID FROM CARTS WHERE USER_ID = @userId)
      `);

    const cartItems = cartResult.recordset;

    cartItems.forEach((item) => {
      count += 1;
      countProd += item.QUANTITY;
      priceProd += item.QUANTITY * item.PRICE;
    });

    if (count > 0) {
      fee = 15000 + 5000 * Math.floor((count - 1) / 3);
    }

    res.status(200).json({
      message: 'Success!',
      countProd: countProd,
      priceProd: priceProd,
      fee: fee,
    });
  } catch (err) {
    res.status(500).json({ message: 'Deleting product failed.' });
    // next(new Error(err));
  }
};

exports.postDecreaseCartItem = async (req, res, next) => {
  let productId,
    countProd = 0,
    priceProd = 0,
    quantity = 0,
    count = 0,
    fee = 0;

  try {
    const pool = await connect;

    const productResult = await pool
      .request()
      .input('productId', sql.Int, req.params.productId)
      .query(`SELECT * FROM PRODUCTS WHERE PRODUCT_ID = @productId`);

    const product = productResult.recordset[0];
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    productId = product.PRODUCT_ID;
    await decreaseQuantity(req.user, product);

    const cartResult = await pool
      .request()
      .input('userId', sql.Int, req.user.USER_ID).query(`
        SELECT cp.*, p.PRICE FROM CART_PRODUCTS cp
        JOIN PRODUCTS p ON cp.PRODUCT_ID = p.PRODUCT_ID
        WHERE cp.CART_ID = (SELECT CART_ID FROM CARTS WHERE USER_ID = @userId)
      `);

    const cartItems = cartResult.recordset;

    cartItems.forEach((item) => {
      count += 1;
      countProd += item.QUANTITY;
      priceProd += item.QUANTITY * item.PRICE;
      if (productId === item.PRODUCT_ID) {
        quantity = item.QUANTITY;
      }
    });

    if (count > 0) {
      fee = 15000 + 5000 * Math.floor((count - 1) / 3);
    }

    res.status(200).json({
      message: 'Success!',
      countProd: countProd,
      priceProd: priceProd,
      quantity: quantity,
      fee: fee,
    });
  } catch (err) {
    res.status(500).json({ message: 'failed.' });
    console.log(err);
  }
};

exports.postIncreaseCartItem = async (req, res, next) => {
  let productId,
    countProd = 0,
    priceProd = 0,
    quantity = 0,
    count = 0;

  try {
    const pool = await connect;

    const productResult = await pool
      .request()
      .input('productId', sql.Int, req.params.productId)
      .query(`SELECT * FROM PRODUCTS WHERE PRODUCT_ID = @productId`);

    const product = productResult.recordset[0];
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    productId = product.PRODUCT_ID;
    await increaseQuantity(req.user, product);

    const cartResult = await pool
      .request()
      .input('userId', sql.Int, req.user.USER_ID).query(`
        SELECT cp.*, p.PRICE FROM CART_PRODUCTS cp
        JOIN PRODUCTS p ON cp.PRODUCT_ID = p.PRODUCT_ID
        WHERE cp.CART_ID = (SELECT CART_ID FROM CARTS WHERE USER_ID = @userId)
      `);

    const cartItems = cartResult.recordset;
    cartItems.forEach((item) => {
      count += 1;
      countProd += item.QUANTITY;
      priceProd += item.QUANTITY * item.PRICE;
      if (productId === item.PRODUCT_ID) {
        quantity = item.QUANTITY;
      }
    });
    const fee = 15000 + 5000 * Math.floor((count - 1) / 3);

    res.status(200).json({
      message: 'Success!',
      countProd: countProd,
      priceProd: priceProd,
      quantity: quantity,
      fee: fee,
    });
  } catch (err) {
    res.status(500).json({ message: 'failed.' });
    console.log(err);
    next(new Error(err));
  }
};
