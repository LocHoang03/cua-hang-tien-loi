const Product = require('../models/product');
const Type = require('../models/type');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const deleteFile = require('../util/delete-file');
const type = require('../models/type');
const { trace } = require('../routes/shop');

const PER_ITEM_PAGE = 6;
exports.getProducts = (req, res, next) => {
  let products, types;
  let totalItem = 0;
  const page = parseInt(req.query.page) || 1;
  console.log('page: ', req.query.page);
  Product.find()
    .count()
    .then((number) => {
      totalItem = number;
      return Product.find()
        .skip((page - 1) * PER_ITEM_PAGE)
        .limit(PER_ITEM_PAGE);
    })
    .then((product) => {
      products = product;
      return Type.find();
    })
    .then((type) => {
      console.log('types: ', type);
      types = type;
      res.render('admin/products', {
        pageTitle: 'Admin Product',
        path: '/admin',
        path1: '/admin',
        types: types,
        type: undefined,
        searchProduct: false,
        products: products,
        adminEdit: true,
        currentPage: page,
        hasNextPage: PER_ITEM_PAGE * page < totalItem,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItem / PER_ITEM_PAGE),
      });
    })
    .catch((error) => {
      console.log('error', error);
      next(new Error(err));
    });
};

exports.getTypeProducts = (req, res, next) => {
  let products, types, idType;
  let totalItem = 0;
  const page = parseInt(req.query.page) || 1;
  Type.find()
    .then((type) => {
      types = type;
      for (let i = 0; i < type.length; i++) {
        if (type[i].nametype === req.params.typeProduct) {
          idType = type[i]._id;
          console.log(idType);
          break;
        }
      }
      return Product.find({ type: idType }).count();
    })
    .then((number) => {
      totalItem = number;
      return Product.find({ type: idType })
        .skip((page - 1) * PER_ITEM_PAGE)
        .limit(PER_ITEM_PAGE);
    })
    .then((product) => {
      console.log(product);
      products = product;
      res.render('admin/products', {
        pageTitle: `${req.params.typeProduct} Product`,
        path: '/admin',
        path1: `/admin/${req.params.typeProduct}`,
        types: types,
        type: req.params.typeProduct,
        products: products,
        adminEdit: true,
        searchProduct: false,
        currentPage: page,
        hasNextPage: PER_ITEM_PAGE * page < totalItem,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItem / PER_ITEM_PAGE),
      });
    })
    .catch((error) => {
      console.log('error', error);
      next(new Error(err));
    });
};

exports.getAddProduct = (req, res, next) => {
  Type.find()
    .then((types) => {
      res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin',
        path1: '/admin/add-product',
        types: types,
        adminEdit: true,
        editing: false,
        errorMessage: null,
        validationErrors: [],
        oldInput: {
          title: '',
          price: '',
        },
      });
    })
    .catch((error) => {
      console.log('error', error);
      next(new Error(err));
    });
};

exports.getEditProduct = async (req, res, next) => {
  console.log('get edit product', req.params);
  const edit = req.query.edit;

  if (!edit) {
    return res.redirect('/admin');
  }

  try {
    const product = await Product.findOne({ _id: req.params.productId });

    if (!product) {
      return res.redirect('/admin');
    }

    // Kiểm tra xem sản phẩm thuộc về người dùng đang đăng nhập
    if (product.userId.toString() !== req.user._id.toString()) {
      return res.redirect('/admin');
    }

    const types = await Type.find();

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin',
      path1: '/admin/edit-product',
      editing: edit,
      adminEdit: true,
      types: types,
      product: product,
      errorMessage: null,
      validationErrors: [],
      oldInput: {
        title: product.title,
        price: product.price,
        _id: product._id,
      },
    });
  } catch (err) {
    console.error(err);
    next(new Error(err));
  }
};

exports.getAddType = (req, res, next) => {
  Type.find()
    .then((types) => {
      res.render('admin/edit-type', {
        pageTitle: 'Add Type',
        path: '/admin',
        path1: '/admin/add-type',
        types: types,
        editing: false,
        type: false,
        adminEdit: true,
        errorMessage: null,
        validationErrors: [],
        oldInput: {
          nametype: '',
          vntype: '',
          _id: '',
        },
      });
    })
    .catch((error) => {
      console.log('error', error);
      next(new Error(err));
    });
};

exports.getEditType = async (req, res, next) => {
  console.log('get edit product', req.params);
  const edit = req.query.edit;
  if (!edit) {
    return res.redirect('/admin/list-type');
  }
  try {
    const typeEdit = await Type.findOne({ _id: req.params.typeId });

    if (!typeEdit) {
      return res.redirect('/admin');
    }

    if (typeEdit.userId.toString() !== req.user._id.toString()) {
      return res.redirect('/admin/list-type');
    }
    const types = await Type.find();

    res.render('admin/edit-type', {
      pageTitle: 'Edit Type Product',
      path: '/admin',
      path1: '/admin/edit-product',
      editing: edit,
      types: types,
      type: typeEdit,
      adminEdit: true,
      errorMessage: null,
      validationErrors: [],
      oldInput: {
        nametype: typeEdit.nametype,
        vntype: typeEdit.vntype,
        _id: typeEdit._id,
      },
    });
  } catch (error) {
    console.log(err);
    next(new Error(err));
  }
};

exports.getListType = (req, res, next) => {
  Type.find()
    .then((types) => {
      res.render('admin/types', {
        pageTitle: 'Admin Types Product',
        path: '/admin',
        path1: '/admin/list-type',
        types: types,
        adminEdit: true,
      });
    })
    .catch((error) => {
      console.log('error', error);
      next(new Error(err));
    });
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('Errors:', errors.array());

    Type.find()
      .then((type) => {
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Add Product',
          path: '/admin',
          path1: '/admin/add-product',
          types: type,
          editing: false,
          adminEdit: true,
          errorMessage: errors.array()[0].msg,
          validationErrors: errors.array(), // Chú ý tên biến là validationErrors
          oldInput: {
            title: req.body.title,
            price: req.body.price,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        next(new Error(err));
      });
  } else {
    const image = req.file;

    if (!image) {
      Type.find()
        .then((type) => {
          return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin',
            path1: '/admin/add-product',
            errorMessage: 'Tập tin đính kèm không phải là một hình ảnh',
            adminEdit: true,
            validationErrors: errors.array(),
            oldInput: {
              title: req.body.title,
              price: req.body.price,
              type: req.body.type,
            },
            types: type,
            editing: false,
          });
        })
        .catch((err) => {
          console.error(err);
          next(new Error(err));
        });
    } else {
      const product = new Product({
        title: req.body.title,
        price: req.body.price,
        imageURL: image.filename,
        type: req.body.type,
        userId: req.user._id,
      });

      product
        .save()
        .then((result) => {
          res.redirect('/admin');
        })
        .catch((err) => {
          console.error(err);
          next(new Error(err));
        });
    }
  }
};

exports.postEditProduct = (req, res, next) => {
  console.log(req.file);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('Errors:', errors.array());

    Type.find()
      .then((types) => {
        return res.status(422).render('admin/edit-product', {
          pageTitle: 'Edit Product',
          path: '/admin',
          path1: '/admin/edit-product',
          adminEdit: true,
          errorMessage: errors.array()[0].msg,
          validationErrors: errors.array(),
          oldInput: {
            title: req.body.title,
            price: req.body.price,
            imageURL: req.body.imageURL,
            type: req.body.type,
            _id: req.body.productId,
          },
          types: types,
          editing: true,
        });
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  } else {
    const image = req.file;
    console.log('postEditProduct', req.body);

    Product.findById(req.body.productId)
      .then((product) => {
        if (!product) {
          const error = new Error('Product not found.');
          error.statusCode = 404;
          throw error;
        }

        product.title = req.body.title;
        product.price = req.body.price;

        if (image) {
          deleteFile.deleteFileImage(product.imageURL);
          product.imageURL = image.filename;
        }

        // Cập nhật type nếu có giá trị mới
        if (req.body.type !== '') {
          product.type = req.body.type;
        }

        return product.save();
      })
      .then((result) => {
        res.redirect('/admin');
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  }
};

exports.postEditType = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('Errors:', errors.array());

    Type.find()
      .then((types) => {
        return res.status(422).render('admin/edit-type', {
          pageTitle: 'Edit Product',
          path: '/admin',
          path1: '/admin/edit-type',
          adminEdit: true,
          errorMessage: errors.array()[0].msg,
          validationErrors: errors.array(),
          oldInput: {
            nametype: req.body.nametype,
            vntype: req.body.vntype,
            _id: req.body.typeId,
          },
          types: types,
          editing: true,
        });
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  } else {
    Type.findById(req.body.typeId)
      .then((type) => {
        if (!type) {
          const error = new Error('Type not found.');
          error.statusCode = 404;
          throw error;
        }

        type.nametype = req.body.nametype;
        type.vntype = req.body.vntype;

        return type.save();
      })
      .then((result) => {
        res.redirect('/admin/list-type');
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  }
};

exports.postTypeProduct = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('error', errors.array());
    Type.find()
      .then((types) => {
        return res.status(422).render('admin/edit-type', {
          pageTitle: 'Add Product',
          path: '/admin',
          path1: '/admin/add-type',
          adminEdit: true,
          errorMessage: errors.array()[0].msg,
          validationErrors: errors.array(),
          oldInput: {
            nametype: req.body.nametype, // Đảm bảo cung cấp giá trị cho nametype
            vntype: req.body.vntype, // Đảm bảo cung cấp giá trị cho vntype
          },
          types: types,
          editing: false,
        });
      })
      .catch((err) => {
        console.error(err);
        next(new Error(err));
      });
  } else {
    const type = new Type({
      nametype: req.body.nametype,
      vntype: req.body.vntype,
      userId: req.user._id,
    });
    type
      .save()
      .then((result) => {
        res.redirect('/admin/list-type');
      })
      .catch((err) => {
        console.error(err);
        next(new Error(err));
      });
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.productId);

    if (!product) {
      return res.redirect('/admin');
    }

    if (product.userId.toString() !== req.user._id.toString()) {
      return res.redirect('/admin');
    }

    await deleteFile.deleteFileImage(product.imageURL);
    await Product.deleteOne({ _id: req.body.productId });

    res.redirect('/admin');
  } catch (err) {
    console.log(err);
    next(new Error(err));
  }
};

exports.postDeleteType = async (req, res, next) => {
  try {
    const type = await Type.findById(req.body.typeId);

    if (!type) {
      return res.redirect('/admin/list-type');
    }

    if (type.userId.toString() !== req.user._id.toString()) {
      return res.redirect('/admin/list-type');
    }

    await Product.deleteMany({ type: type._id });
    await Type.deleteOne({ _id: req.body.typeId });

    res.redirect('/admin/list-type');
  } catch (err) {
    console.log(err);
    next(new Error(err));
  }
};
