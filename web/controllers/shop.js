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

exports.getHomeShop = async (req, res, next) => {
  try {
    const pool = await connect;
    const products = await pool.request().query(
      `SELECT TOP 4 * 
      FROM PRODUCTS a 
      JOIN TYPE_PRODUCTS b ON a.TYPE_ID = b.TYPE_ID 
      WHERE b.TYPE_ID = 1
      ORDER BY a.TITLE ASC`,
    );
    const products2 = await pool.request().query(
      `SELECT TOP 4 * 
        FROM PRODUCTS a 
        JOIN TYPE_PRODUCTS b ON a.TYPE_ID = b.TYPE_ID 
        WHERE b.TYPE_ID = 2
        ORDER BY a.TITLE ASC`,
    );
    const products3 = await pool.request().query(
      `SELECT TOP 4 * 
        FROM PRODUCTS a 
        JOIN TYPE_PRODUCTS b ON a.TYPE_ID = b.TYPE_ID 
        WHERE b.TYPE_ID = 3
        ORDER BY a.TITLE ASC`,
    );
    const products4 = await pool.request().query(
      `SELECT TOP 4 * 
        FROM PRODUCTS a 
        JOIN TYPE_PRODUCTS b ON a.TYPE_ID = b.TYPE_ID 
        WHERE b.TYPE_ID = 4
        ORDER BY a.TITLE ASC`,
    );
    res.render('shop/home', {
      pageTitle: 'Trang chủ',
      path: '/',
      products: products,
      products2: products2,
      products3: products3,
      products4,
    });
  } catch (err) {
    next(new Error(err));
  }
};

// exports.getNewsShop = (req, res, next) => {
//   const newsCompanyBuffer = fs.readFileSync(path.join(__dirname, '../data/json/newsCompany.json'), 'utf8');
//   const newsCompany = JSON.parse(newsCompanyBuffer);

//   const ResponsibilityBuffer = fs.readFileSync(path.join(__dirname, '../data/json/responsibility.json'), 'utf8');
//   const Responsibility = JSON.parse(ResponsibilityBuffer);
//   res.render('shop/news', {
//     pageTitle: 'Tin tức',
//     path: '/news',
//     companys: newsCompany,
//     responsibility: Responsibility,
//   });
// };

// exports.getIntroducesShop = (req, res, next) => {
//   const arr1Buffer = fs.readFileSync(path.join(__dirname, '../data/json/arr1-Introduce.json'), 'utf8');
//   const arr1 = JSON.parse(arr1Buffer);

//   const arr2Buffer = fs.readFileSync(path.join(__dirname, '../data/json/arr2-Introduce.json'), 'utf8');
//   const arr2 = JSON.parse(arr2Buffer);
//   res.render('shop/introduce/introduces', {
//     pageTitle: 'Về NextStore',
//     path: '/introduces',
//     path1: '/introduces',
//     arr1: arr1,
//     arr2: arr2,
//   });
// };

// exports.getPrefaceShop = (req, res, next) => {
//   const arr3Buffer = fs.readFileSync(path.join(__dirname, '../data/json/preface.json'), 'utf8');
//   const arr3 = JSON.parse(arr3Buffer);

//   res.render('shop/introduce/preface', {
//     pageTitle: 'Lời ngỏ',
//     path: '/introduces',
//     path1: '/introduces/loi-ngo',
//     arr3: arr3,
//   });
// };

// exports.getMottoShop = (req, res, next) => {
//   const mottoBuffer = fs.readFileSync(path.join(__dirname, '../data/json/motto.json'), 'utf8');
//   const motto = JSON.parse(mottoBuffer);
//   res.render('shop/introduce/motto', {
//     pageTitle: 'Phương châm',
//     path: '/introduces',
//     path1: '/introduces/phuong-cham',
//     motto: motto,
//   });
// };

// exports.getContactShop = (req, res, next) => {
//   res.render('shop/contact', {
//     pageTitle: 'Liên hệ',
//     path: '/contact',
//   });
// };

// const PER_ITEM_PAGE = 6;
// exports.getProductsShop = (req, res, next) => {
//   let totalItem = 0;
//   const page = parseInt(req.query.page) || 1;
//   console.log('page: ', req.query.page);
//   let products, types;
//   Product.find()
//     .count()
//     .then((number) => {
//       totalItem = number;
//       return Product.find()
//         .skip((page - 1) * PER_ITEM_PAGE)
//         .limit(PER_ITEM_PAGE);
//     })
//     .then((product) => {
//       products = product;
//       return Type.find();
//     })
//     .then((type) => {
//       types = type;
//       res.render('shop/products/products', {
//         pageTitle: 'Sản Phẩm',
//         path: '/products',
//         path1: '/products',
//         types: types,
//         detail: undefined,
//         type: undefined,
//         searchProduct: undefined,
//         products: products,
//         adminEdit: false,
//         currentPage: page,
//         hasNextPage: PER_ITEM_PAGE * page < totalItem,
//         hasPreviousPage: page > 1,
//         nextPage: page + 1,
//         previousPage: page - 1,
//         lastPage: Math.ceil(totalItem / PER_ITEM_PAGE),
//       });
//     })
//     .catch((error) => {
//       console.log('error', error);
//       next(new Error(err));
//     });
// };

// exports.getTypeProductsShop = (req, res, next) => {
//   console.log('getTypeProducts: ', req.params);
//   let products, types, idType;
//   let totalItem = 0;
//   const page = parseInt(req.query.page) || 1;
//   console.log('page: ', req.query.page);
//   Type.find()
//     .then((type) => {
//       types = type;
//       for (let i = 0; i < type.length; i++) {
//         if (type[i].nametype === req.params.typeProduct) {
//           idType = type[i]._id;
//           console.log(idType);
//           break;
//         }
//       }
//       return Product.find({ type: idType }).count();
//     })
//     .then((number) => {
//       totalItem = number;
//       return Product.find({ type: idType })
//         .skip((page - 1) * PER_ITEM_PAGE)
//         .limit(PER_ITEM_PAGE);
//     })
//     .then((product) => {
//       products = product;
//       res.render('shop/products/products', {
//         pageTitle: `${req.params.typeProduct} Product`,
//         path: '/products',
//         path1: `/products/${req.params.typeProduct}`,
//         types: types,
//         type: req.params.typeProduct,
//         products: products,
//         adminEdit: false,
//         detail: undefined,
//         searchProduct: undefined,
//         currentPage: page,
//         hasNextPage: PER_ITEM_PAGE * page < totalItem,
//         hasPreviousPage: page > 1,
//         nextPage: page + 1,
//         previousPage: page - 1,
//         lastPage: Math.ceil(totalItem / PER_ITEM_PAGE),
//       });
//     })
//     .catch((error) => {
//       console.log('error', error);
//       next(new Error(err));
//     });
// };

// exports.getDetailProduct = (req, res, next) => {
//   let products, types, idType;

//   Type.find()
//     .then((type) => {
//       types = type;
//       for (let i = 0; i < type.length; i++) {
//         if (type[i].nametype === req.params.typeProduct) {
//           idType = type[i]._id;
//           console.log(idType);
//           break;
//         }
//       }
//       return Product.findOne({ _id: req.params.productId });
//     })
//     .then((product) => {
//       res.render('shop/products/detail-product', {
//         pageTitle: 'Chi tiết sản phẩm',
//         path: '/detail-product',
//         path1: '/detail-product',
//         detail: true,
//         product: product,
//         types: types,
//         adminEdit: false,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       next(new Error(err));
//     });
// };

// exports.getCart = (req, res, next) => {
//   req.user
//     .populate('cart.items.productId')
//     .then((user) => {
//       const products = user.cart.items;
//       res.render('shop/products/cart', {
//         pageTitle: 'My Cart',
//         path: '/cart',
//         products: products,
//         // name: req.name,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       next(new Error(err));
//     });
// };

// exports.getOrder = (req, res, next) => {
//   let total;
//   Order.find({ 'user.userId': req.user._id })
//     .then((order) => {
//       res.render('shop/products/order', {
//         pageTitle: 'My Order',
//         path: '/order',
//         orders: order,
//         // name: req.name,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       next(new Error(err));
//     });
// };

// exports.postCart = (req, res, next) => {
//   // const data = req.body;
//   // console.log('data',JSON.parse(data));
//   // const productId = JSON.parse(Object.keys(req.body)[0]).id
//   // console.log('req.body-cart',productId)
//   let countProd = 0,
//     priceProd = 0;

//   Product.findById(req.body.id)
//     .then((product) => {
//       if (!product) {
//         return res.status(404).json({ message: 'Product not found.' });
//       }
//       req.user.AddToCart(product);
//       return req.user.populate('cart.items.productId');
//     })
//     .then((user) => {
//       return user.cart.items.map((item) => {
//         countProd += item.quantity;
//         priceProd += item.quantity * item.productId.price;
//       });
//     })
//     .then(() => {
//       res.status(200).json({
//         message: 'Success!',
//         countProd: countProd,
//         priceProd: priceProd,
//       });
//     })
//     .catch((err) => {
//       console.log('err: ', err);
//       res.status(500).json({ message: 'Deleting product failed.' });
//     });
// };

// exports.postDeleteAllCartItem = async (req, res, next) => {
//   let countProd = 0,
//     priceProd = 0,
//     count = 0,
//     fee = 0;
//   try {
//     const result = await req.user.ClearCart();
//     console.log('result', result);
//     res.status(200).json({
//       message: 'Success!',
//       countProd: countProd,
//       priceProd: priceProd,
//       count: count,
//       fee: fee,
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Deleting product failed.' });
//   }
// };

// exports.postDeleteCartItem = (req, res, next) => {
//   console.log('postDeleteCartItem:', req.params);
//   let productId,
//     countProd = 0,
//     priceProd = 0,
//     count = 0,
//     fee = 0;
//   Product.findById(req.params.productId)
//     .then((product) => {
//       req.user.DeleteCartItem(product);
//       return req.user.populate('cart.items.productId');
//     })
//     .then((user) => {
//       return user.cart.items.map((item) => {
//         count += 1;
//         countProd += item.quantity;
//         priceProd += item.quantity * item.productId.price;
//       });
//     })
//     .then(() => {
//       if (count > 0) {
//         fee = 15000 + 5000 * Math.floor((count - 1) / 3);
//       }
//       res.status(200).json({
//         message: 'Success!',
//         countProd: countProd,
//         priceProd: priceProd,
//         fee: fee,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: 'Deleting product failed.' });
//     });
// };

// exports.postDecreaseCartItem = (req, res, next) => {
//   let productId,
//     countProd = 0,
//     priceProd = 0,
//     quantity = 0,
//     count = 0,
//     fee = 0;
//   Product.findById(req.params.productId)
//     .then((product) => {
//       console.log('product', product);
//       productId = product._id;
//       req.user.DecreaseQuantity(product);
//       return req.user.populate('cart.items.productId');
//     })
//     .then((user) => {
//       return user.cart.items.map((item) => {
//         count += 1;
//         countProd += item.quantity;
//         priceProd += item.quantity * item.productId.price;
//         if (productId.toString() === item.productId._id.toString()) {
//           quantity = item.quantity;
//         }
//       });
//     })
//     .then(() => {
//       if (count > 0) {
//         fee = 15000 + 5000 * Math.floor((count - 1) / 3);
//       }
//       res.status(200).json({
//         message: 'Success!',
//         countProd: countProd,
//         priceProd: priceProd,
//         quantity: quantity,
//         fee: fee,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: 'failed.' });
//       console.log(err);
//       //next(new Error(err))
//     });
// };

// exports.postIncreaseCartItem = (req, res, next) => {
//   let productId,
//     countProd = 0,
//     priceProd = 0,
//     quantity = 0,
//     count = 0;
//   Product.findById(req.params.productId)
//     .then((product) => {
//       console.log('product', product);
//       productId = product._id;
//       req.user.IncreaseQuantity(product);
//       return req.user.populate('cart.items.productId');
//     })
//     .then((user) => {
//       return user.cart.items.map((item) => {
//         count += 1;
//         countProd += item.quantity;
//         priceProd += item.quantity * item.productId.price;
//         if (productId.toString() === item.productId._id.toString()) {
//           quantity = item.quantity;
//         }
//       });
//     })
//     .then(() => {
//       const fee = 15000 + 5000 * Math.floor((count - 1) / 3);
//       res.status(200).json({
//         message: 'Success!',
//         countProd: countProd,
//         priceProd: priceProd,
//         quantity: quantity,
//         fee: fee,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: 'failed.' });
//       console.log(err);
//       next(new Error(err));
//     });
// };

// exports.getInvoice = (req, res, next) => {
//   const invoiceName = 'invoice-' + req.params.orderId + '.pdf';
//   const invoicePath = path.join('data', 'invoice', invoiceName);
//   console.log('dirname:   ', path.join(__dirname, '../', 'fonts', 'Arial.ttf'));
//   Order.findById(req.params.orderId)
//     .populate('user.userId')
//     .then((order) => {
//       if (order) {
//         const pdfDoc = new pdfDocument();
//         let fontpath = path.join(__dirname, '../', 'fonts', 'Arial.ttf');
//         pdfDoc.pipe(fs.createWriteStream(invoicePath));
//         pdfDoc.pipe(res);
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader(
//           'Content-Disposition',
//           'inline; filename="' + invoicePath + '"'
//         );
//         pdfDoc.font(fontpath).fontSize(30).text('Invoice', { underline: true });
//         pdfDoc.text('--------------------------------------------');
//         pdfDoc.fontSize(18).text('Khách hàng: ' + order.user.userId.name);
//         pdfDoc.moveDown();
//         pdfDoc.text('Danh sách sản phẩm:');
//         pdfDoc.moveDown();
//         let total = 0;
//         total += order.fee;
//         order.products.map((product) => {
//           total += product.quantity * product.product.price;
//           pdfDoc.text(
//             '    ' +
//               '- ' +
//               product.product.title +
//               ' - ' +
//               product.quantity +
//               ' x ' +
//               product.product.price +
//               ' đ'
//           );
//           pdfDoc.moveDown();
//         });
//         pdfDoc.fontSize(20);
//         pdfDoc.text('Phí vận chuyển : ' + order.fee + ' đ');
//         pdfDoc.text('---------------------');
//         pdfDoc.text('total: ' + total + ' đ');
//         pdfDoc.end();
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       next(new Error(err));
//     });
// };

// exports.createCheckout = (req, res, next) => {
//   let listProducts;
//   let total, session;
//   req.user
//     .populate('cart.items.productId')
//     .then((user) => {
//       listProducts = user.cart.items;
//       if (listProducts.length > 0) {
//         const products = user.cart.items.map((item) => {
//           return {
//             quantity: item.quantity,
//             product: { ...item.productId._doc },
//           };
//         });
//         const order = new Order({
//           user: {
//             userId: req.user,
//             email: req.user.email,
//           },
//           products: products,
//           fee: req.fee,
//         });
//         order.save();
//       }
//       return stripe.checkout.sessions.create({
//         // Remove the payment_method_types parameter
//         // to manage payment methods in the Dashboard
//         payment_method_types: ['card'],
//         line_items: [
//           ...listProducts.map((product) => {
//             return {
//               price_data: {
//                 // The currency parameter determines which
//                 // payment methods are used in the Checkout Session.
//                 currency: 'USD',
//                 product_data: {
//                   name: product.productId.title,
//                 },
//                 unit_amount: ((product.productId.price / 23600) * 100).toFixed(
//                   0
//                 ),
//               },
//               quantity: product.quantity,
//             };
//           }),
//           {
//             // Thêm mục phí vận chuyển vào đây
//             price_data: {
//               currency: 'USD',
//               product_data: {
//                 name: 'Phí vận chuyển', // Tên mục phí vận chuyển
//               },
//               unit_amount: ((req.fee / 23600) * 100).toFixed(0), // Số tiền phí vận chuyển (đổi thành số tiền thực tế)
//             },
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: req.protocol + '://' + req.get('host') + '/order',
//         cancel_url: req.protocol + '://' + req.get('host') + '/cart',
//       });
//     })
//     .then((session) => {
//       res.redirect(303, session.url);
//       return req.user.ClearCart();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.postRepurchaseProduct = async (req, res, next) => {
//   try {
//     const order = await Order.findOne({ _id: req.body.orderId });
//     // Thêm sản phẩm từ đơn hàng vào giỏ hàng
//     console.log(order.products);
//     await req.user.AddCartFromOrder(order.products);

//     res.redirect('/cart');
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };

// let querySearchProducts;

// exports.SearchProducts = (req, res, next) => {
//   if (req.method === 'GET') {
//     const page = parseInt(req.query.page) || 1;
//     console.log('page: ', req.query.page);
//     querySearchProduct(res, page, querySearchProducts);
//   } else {
//     const page = 1;
//     querySearchProducts = req.body.searchProduct;
//     res.redirect(`/search-products/?query=${page}`);
//     // querySearchProduct(res, page, querySearchProducts, 'post');
//   }
// };

// function querySearchProduct(res, page, string) {
//   let products,
//     types,
//     totalItem = 0;
//   Product.find({
//     title: { $regex: `.*${string}.*`, $options: 'i' },
//   })
//     .count()
//     .then((count) => {
//       totalItem = count;
//       return Product.find({
//         title: { $regex: `.*${string}.*`, $options: 'i' },
//       })
//         .skip((page - 1) * PER_ITEM_PAGE)
//         .limit(PER_ITEM_PAGE);
//     })
//     .then((product) => {
//       products = product;
//       console.log(products);
//       return Type.find();
//     })
//     .then((type) => {
//       types = type;
//       res.render('shop/products/products', {
//         pageTitle: 'Sản Phẩm',
//         path: '/search-products',
//         path1: '/search-products',
//         adminEdit: false,
//         searchProduct: true,
//         types: types,
//         products: products,
//         type: undefined,
//         currentPage: page,
//         hasNextPage: PER_ITEM_PAGE * page < totalItem,
//         hasPreviousPage: page > 1,
//         nextPage: page + 1,
//         previousPage: page - 1,
//         lastPage: Math.ceil(totalItem / PER_ITEM_PAGE),
//       });
//     })
//     .catch((error) => {
//       console.log('error', error);
//       next(new Error(err));
//     });
// }

// exports.getSearchProducts = (req, res, next) => {
//   const page = parseInt(req.query.page) || 1;
//   console.log('page: ', req.query.page);
//   let products,
//     types,
//     totalItem = 0;
//   if (querySearchProduct) {
//     Product.find({
//       title: { $regex: `.*${querySearchProduct}.*`, $options: 'i' },
//     })
//       .count()
//       .then((count) => {
//         totalItem = count;
//         return Product.find({
//           title: { $regex: `.*${querySearchProduct}.*`, $options: 'i' },
//         })
//           .skip((page - 1) * PER_ITEM_PAGE)
//           .limit(PER_ITEM_PAGE);
//       })
//       .then((product) => {
//         products = product;
//         console.log(products);
//         return Type.find();
//       })
//       .then((type) => {
//         types = type;
//         res.render('shop/products/products', {
//           pageTitle: 'Sản Phẩm',
//           path: '/search-products',
//           path1: '/search-products',
//           adminEdit: false,
//           searchProduct: true,
//           types: types,
//           products: products,
//           type: undefined,
//           currentPage: page,
//           hasNextPage: PER_ITEM_PAGE * page < totalItem,
//           hasPreviousPage: page > 1,
//           nextPage: page + 1,
//           previousPage: page - 1,
//           lastPage: Math.ceil(totalItem / PER_ITEM_PAGE),
//         });
//       })
//       .catch((error) => {
//         console.log('error', error);
//         next(new Error(err));
//       });
//   } else {
//     res.status(404).render('404.ejs', {
//       pageTitle: 'Page not found',
//       path: '/404',
//     });
//   }
// };

// exports.postSearchProducts = (req, res, next) => {
//   const page = parseInt(req.query.page) || 1;
//   console.log('page: ', req.query.page);
//   querySearchProduct = req.body.searchProduct;
// };
