const { body } = require('express-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
  },
  resetToken: String,
  tokenExpiration: Date,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

User.methods.AddCartFromOrder = function (products) {
  this.cart = {
    items: [],
  };
  let updateCartItem = [...this.cart.items];
  products.forEach(function (product) {
    updateCartItem.push({
      productId: product.product._id,
      quantity: product.quantity,
    });
  });

  const updateCart = {
    items: updateCartItem,
  };

  this.cart = updateCart;

  this.save();
};

User.methods.AddToCart = function (product) {
  const indexProduct = this.cart.items.findIndex((item) => {
    return item.productId._id.toString() === product._id.toString();
  });

  let newQuantity = 1;
  let updateCartItem = [...this.cart.items];

  if (indexProduct >= 0) {
    newQuantity = this.cart.items[indexProduct].quantity + 1;
    this.cart.items[indexProduct].quantity = newQuantity;
  } else {
    updateCartItem.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updateCart = {
    items: updateCartItem,
  };

  this.cart = updateCart;

  this.save();
};

User.methods.DeleteCartItem = function (product) {
  const updateCartItem = this.cart.items.filter(
    (item) => item.productId._id.toString() !== product._id.toString()
  );
  this.cart = {
    items: updateCartItem,
  };

  this.save();
};

User.methods.IncreaseQuantity = function (product) {
  const indexProduct = this.cart.items.findIndex((item) => {
    console.log('item', item.productId);
    return item.productId._id.toString() === product._id.toString();
  });

  let newQuantity = 1;
  let updateCartItem = [...this.cart.items];

  if (indexProduct >= 0) {
    newQuantity = this.cart.items[indexProduct].quantity + 1;
    this.cart.items[indexProduct].quantity = newQuantity;
  } else {
    return 0;
  }

  const updateCart = {
    items: updateCartItem,
  };

  this.cart = updateCart;

  this.save();
};

User.methods.DecreaseQuantity = function (product) {
  const indexProduct = this.cart.items.findIndex((item) => {
    return item.productId._id.toString() === product._id.toString();
  });

  let newQuantity = 1;
  let updateCartItem = [...this.cart.items];

  if (indexProduct >= 0) {
    if (this.cart.items[indexProduct].quantity - 1 === 0) {
      return this.DeleteCartItem(product);
    }
    newQuantity = this.cart.items[indexProduct].quantity - 1;
    this.cart.items[indexProduct].quantity = newQuantity;
  } else {
    return 0;
  }

  const updateCart = {
    items: updateCartItem,
  };

  this.cart = updateCart;

  this.save();
};

User.methods.ClearCart = function () {
  this.cart = {
    items: [],
  };

  this.save();
};

module.exports = mongoose.model('User', User);
