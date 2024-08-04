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
require('dotenv').config();
const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteCartItem,
  clearCart,
  updateUserCart,
} = require('../util/cart');
const { initialize } = require('../util/return');
const createOrderPdf = require('../util/orderPdf');

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
    req.session.order = null;
    res.render('shop/products/cart', {
      pageTitle: 'My Cart',
      path: '/cart',
      products: products,
    });
  } catch (error) {
    next(new Error(error));
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    let pool = await connect;

    if (req.session.order) {
      const userCartResult = await pool
        .request()
        .input('userId', sql.Int, req.user.USER_ID)
        .query(
          `SELECT a.* FROM CART_PRODUCTS a, CARTS b WHERE a.CART_ID = b.CART_ID AND b.USER_ID = @userId `,
        );
      const listProducts = userCartResult.recordset;
      if (listProducts.length > 0) {
        const products = await Promise.all(
          listProducts.map(async (item) => {
            const productResult = await pool
              .request()
              .input('productId', sql.Int, item.PRODUCT_ID)
              .query(`SELECT * FROM PRODUCTS WHERE PRODUCT_ID = @productId`);
            const product = productResult.recordset[0];
            return {
              quantity: item.QUANTITY,
              product: product,
            };
          }),
        );
        const orderQuery = `
            INSERT INTO ORDERS (USER_ID, USER_EMAIL, FEE,TRANSPORT_FEE)
            OUTPUT Inserted.ORDER_ID
            VALUES (@userId, @userEmail, @fee,@transport)
          `;
        const orderResult = await pool
          .request()
          .input('userId', sql.Int, req.user.USER_ID)
          .input('userEmail', sql.NVarChar, req.user.EMAIL)
          .input('fee', sql.Float, req.total)
          .input('transport', sql.Float, req.fee)
          .query(orderQuery);
        const orderId = orderResult.recordset[0].ORDER_ID;
        for (const item of products) {
          await pool
            .request()
            .input('orderId', sql.Int, orderId)
            .input('productId', sql.Int, item.product.PRODUCT_ID)
            .input('quantity', sql.Int, item.quantity).query(`
                INSERT INTO ORDER_PRODUCTS (ORDER_ID, PRODUCT_ID, QUANTITY)
                VALUES (@orderId, @productId, @quantity)
              `);
        }
      }
      await clearCart(req.user);
    }
    req.session.order = null;

    let result = await pool
      .request()
      .input('userId', sql.NVarChar, req.user.USER_ID)
      .query(
        `SELECT a.ORDER_ID, a.FEE ,b.QUANTITY ,c.* FROM ORDERS a, ORDER_PRODUCTS b, PRODUCTS c 
        WHERE a.USER_ID = @userId AND a.ORDER_ID = b.ORDER_ID AND b.PRODUCT_ID = c.PRODUCT_ID`,
      );

    let orders = result.recordset;

    const orderMap = {};

    orders.forEach((item) => {
      const { ORDER_ID, PRODUCT_ID, TITLE, PRICE, IMAGE_URL, QUANTITY, FEE } =
        item;

      if (!orderMap[ORDER_ID]) {
        orderMap[ORDER_ID] = {
          orderId: ORDER_ID,
          fee: FEE,
          products: [],
        };
      }

      orderMap[ORDER_ID].products.push({
        productId: PRODUCT_ID,
        title: TITLE,
        price: PRICE,
        quantity: QUANTITY,
        imageUrl: IMAGE_URL,
      });
    });

    const resultArray = Object.values(orderMap);
    res.render('shop/products/order', {
      pageTitle: 'My Order',
      path: '/order',
      orders: resultArray.reverse(),
    });
  } catch (err) {
    next(new Error(err));
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

exports.getCheckOut = async (req, res, next) => {
  try {
    req.session.order = true;
    res.render('shop/checkout', {
      pageTitle: 'Thanh toán',
      path: '/checkout',
    });
  } catch (error) {
    next(new Error(error));
  }
};
exports.createCheckout = async (req, res) => {
  const pool = await connect;
  const cartIdResult = await pool
    .request()
    .input('userId', sql.Int, req.user.USER_ID)
    .query(`SELECT CART_ID FROM CARTS WHERE USER_ID = @userId`);
  const cartId = cartIdResult.recordset[0].CART_ID;

  const cartProductResult = await pool
    .request()
    .input('cartId', sql.Int, cartId).query(`
        SELECT a.QUANTITY, b.PRICE,b.TITLE FROM CART_PRODUCTS a, PRODUCTS b 
        WHERE CART_ID = @cartId AND a.PRODUCT_ID = b.PRODUCT_ID
      `);

  const listProducts = cartProductResult.recordset;
  console.log(listProducts);
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      ...listProducts.map((product) => {
        return {
          price_data: {
            currency: 'USD',
            product_data: {
              name: product.TITLE,
            },
            unit_amount: ((product.PRICE / 25000) * 100).toFixed(0),
          },
          quantity: product.QUANTITY,
        };
      }),
      {
        price_data: {
          currency: 'USD',
          product_data: {
            name: 'Phí vận chuyển',
          },
          unit_amount: ((req.fee / 25000) * 100).toFixed(0),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `${req.protocol}://${req.get('host')}/order`,
  });

  res.send({ clientSecret: session.client_secret });
};

exports.getInvoice = async (req, res, next) => {
  try {
    let pool = await connect;
    const orderIdResult = await pool
      .request()
      .input('userId', sql.Int, req.user.USER_ID)
      .input('orderId', sql.Int, req.params.orderId)
      .query(
        `SELECT * FROM ORDERS WHERE USER_ID = @userId AND ORDER_ID = @orderId`,
      );
    const order = orderIdResult.recordset[0];
    const productOrder = await pool
      .request()
      .input('orderId', sql.Int, order.ORDER_ID)
      .query(
        `SELECT * FROM ORDER_PRODUCTS a, PRODUCTS b WHERE ORDER_ID = @orderId AND a.PRODUCT_ID = b.PRODUCT_ID`,
      );
    await createOrderPdf(order, req.user, productOrder.recordset, res);
  } catch (err) {
    console.log(err);
    next(new Error(err));
  }
};

exports.postRepurchaseProduct = async (req, res, next) => {
  try {
    let pool = await connect;
    const orderIdResult = await pool
      .request()
      .input('userId', sql.Int, req.user.USER_ID)
      .input('orderId', sql.Int, req.body.orderId)
      .query(
        `SELECT * FROM ORDERS WHERE USER_ID = @userId AND ORDER_ID = @orderId`,
      );
    const orderId = orderIdResult.recordset[0].ORDER_ID;

    const quantityProductOrder = await pool
      .request()
      .input('orderId', sql.Int, orderId)
      .query(`SELECT * FROM ORDER_PRODUCTS WHERE  ORDER_ID = @orderId`);
    await clearCart(req.user);
    await updateUserCart(req.user.USER_ID, quantityProductOrder.recordset);
    res.redirect('/cart');
  } catch (err) {
    next(new Error(err));
  }
};

let querySearchProducts;

async function querySearchProduct(res, page, string, next) {
  try {
    let pool = await connect;

    let searchString = `%${string}%`;

    let totalItemResult = await pool
      .request()
      .input('searchString', sql.NVarChar, searchString)
      .query(
        'SELECT COUNT(*) AS count FROM PRODUCTS WHERE TITLE LIKE @searchString',
      );
    let totalItem = totalItemResult.recordset[0].count;

    let productsResult = await pool
      .request()
      .input('searchString', sql.NVarChar, searchString)
      .input('offset', sql.Int, (page - 1) * PER_ITEM_PAGE)
      .input('limit', sql.Int, PER_ITEM_PAGE)
      .query(
        'SELECT * FROM PRODUCTS WHERE TITLE LIKE @searchString ORDER BY TITLE OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY',
      );
    let products = productsResult.recordset;

    let typesResult = await pool.request().query('SELECT * FROM TYPE_PRODUCTS');
    let types = typesResult.recordset;

    res.render('shop/products/products', {
      pageTitle: 'Sản Phẩm',
      path: '/search-products',
      path1: '/search-products',
      adminEdit: false,
      searchProduct: true,
      types: types,
      products: products,
      type: undefined,
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
}

exports.SearchProducts = async (req, res, next) => {
  if (req.method === 'GET') {
    const page = parseInt(req.query.page) || 1;
    await querySearchProduct(res, page, querySearchProducts, next);
  } else {
    const page = 1;
    querySearchProducts = req.body.searchProduct;
    res.redirect(`/search-products/?page=${page}`);
  }
};

exports.getCheckOutMoMo = async (req, res, next) => {
  var accessKey = 'F8BBA842ECF85';
  var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  var orderInfo = 'pay with MoMo';
  var partnerCode = 'MOMO';
  var redirectUrl = `${req.protocol}://${req.get('host')}/order`;
  var ipnUrl = 'https://690b-171-239-130-166.ngrok-free.app/callback-momo';
  var requestType = 'captureWallet';
  var amount = req.total;
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData = Buffer.from(
    JSON.stringify({ user: req.user, total: req.total, fee: req.fee }),
  ).toString('base64');
  var orderGroupId = '';
  var autoCapture = true;
  var lang = 'vi';

  var rawSignature =
    'accessKey=' +
    accessKey +
    '&amount=' +
    amount +
    '&extraData=' +
    extraData +
    '&ipnUrl=' +
    ipnUrl +
    '&orderId=' +
    orderId +
    '&orderInfo=' +
    orderInfo +
    '&partnerCode=' +
    partnerCode +
    '&redirectUrl=' +
    redirectUrl +
    '&requestId=' +
    requestId +
    '&requestType=' +
    requestType;
  //puts raw signature

  //signature
  const crypto = require('crypto');
  var signature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: 'Test',
    storeId: 'MomoTestStore',
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
  });
  //Create the HTTPS objects
  const result = await fetch(
    'https://test-payment.momo.vn/v2/gateway/api/create',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      },
      body: requestBody,
    },
  );
  const json = await result.json();
  res.status(201).json({ result: json });
};

exports.callbackMoMo = async (req, res) => {
  console.log('body đâu', req.body);
  if (req.body.resultCode === 0) {
    const userData = JSON.parse(
      Buffer.from(req.body.extraData, 'base64').toString('utf-8'),
    );
    const pool = await connect;
    const userCartResult = await pool
      .request()
      .input('userId', sql.Int, userData.user.USER_ID)
      .query(
        `SELECT a.* FROM CART_PRODUCTS a, CARTS b WHERE a.CART_ID = b.CART_ID AND b.USER_ID = @userId `,
      );
    const listProducts = userCartResult.recordset;
    if (listProducts.length > 0) {
      const products = await Promise.all(
        listProducts.map(async (item) => {
          const productResult = await pool
            .request()
            .input('productId', sql.Int, item.PRODUCT_ID)
            .query(`SELECT * FROM PRODUCTS WHERE PRODUCT_ID = @productId`);
          const product = productResult.recordset[0];
          return {
            quantity: item.QUANTITY,
            product: product,
          };
        }),
      );
      const orderQuery = `
          INSERT INTO ORDERS (USER_ID, USER_EMAIL, FEE,TRANSPORT_FEE)
          OUTPUT Inserted.ORDER_ID
          VALUES (@userId, @userEmail, @fee,@transport)
        `;
      const orderResult = await pool
        .request()
        .input('userId', sql.Int, userData.user.USER_ID)
        .input('userEmail', sql.NVarChar, userData.user.EMAIL)
        .input('fee', sql.Float, userData.total)
        .input('transport', sql.Float, userData.fee)
        .query(orderQuery);
      const orderId = orderResult.recordset[0].ORDER_ID;
      for (const item of products) {
        await pool
          .request()
          .input('orderId', sql.Int, orderId)
          .input('productId', sql.Int, item.product.PRODUCT_ID)
          .input('quantity', sql.Int, item.quantity).query(`
              INSERT INTO ORDER_PRODUCTS (ORDER_ID, PRODUCT_ID, QUANTITY)
              VALUES (@orderId, @productId, @quantity)
            `);
      }
    }
    await clearCart(userData.user);
  }

  return res.status(204).json(req.body);
};
