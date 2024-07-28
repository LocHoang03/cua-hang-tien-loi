const Checkout = function (btn) {
  const lengthProductCart = document
    .querySelector('.cart__list-products')
    .getElementsByTagName('li').length;
  if (lengthProductCart < 1) {
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
};

const postDeleteAllCart = function (btn) {
  const noProduct = document.querySelector('.no-product1');
  const textCart = document.getElementById('quantity-price');
  const provisional = document.querySelector('.checkout__provisional');
  const sumPrice = document.querySelector('.checkout__sum-price');
  const feeTransport = document.querySelector('.checkout__fee-transport');
  const checkoutTotalSumPrice = document.querySelector(
    '.checkout__total-sum-price',
  );
  var ul = document.querySelector('cart__list-products');
  const lengthProductCart = document
    .querySelector('.cart__list-products')
    .querySelectorAll('li');
  fetch('/delete-full-cart-item', {
    method: 'DELETE',
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      for (let i = 0; i < lengthProductCart.length; i++) {
        if (lengthProductCart[i] != null) {
          lengthProductCart[i].parentNode.removeChild(lengthProductCart[i]);
        }
      }
      // Xóa tất cả các thẻ <li> trong danh sách <ul>
      const total = parseFloat(data.priceProd) + parseFloat(data.fee);
      textCart.innerText = `${data.countProd} items - ${data.priceProd}đ`;
      provisional.innerText = `Tạm tính(${data.countProd} sản phẩm)`;
      sumPrice.innerText = `${data.priceProd} VND`;
      feeTransport.innerText = `${data.fee} VND`;
      checkoutTotalSumPrice.innerText = `${total} VND`;
      noProduct.style.display = 'flex';
    });
};

const deleteProductItem = function (btn) {
  const productId = btn.parentNode.querySelector('[name="productId"]').value;
  const lengthProductCart = document
    .querySelector('.cart__list-products')
    .getElementsByTagName('li').length;
  const itemProductCart = btn.closest('li');
  const noProduct = document.querySelector('.no-product1');
  const textCart = document.getElementById('quantity-price');
  const provisional = document.querySelector('.checkout__provisional');
  const sumPrice = document.querySelector('.checkout__sum-price');
  const feeTransport = document.querySelector('.checkout__fee-transport');
  const checkoutTotalSumPrice = document.querySelector(
    '.checkout__total-sum-price',
  );
  fetch('/delete-cart-item/' + productId, {
    method: 'DELETE',
    headers: {},
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      if (lengthProductCart < 2) {
        const total = parseFloat(data.priceProd) + parseFloat(data.fee);
        textCart.innerText = `${data.countProd} items - ${data.priceProd}đ`;
        provisional.innerText = `Tạm tính(${data.countProd} sản phẩm)`;
        sumPrice.innerText = `${data.priceProd} VND`;
        feeTransport.innerText = `${data.fee} VND`;
        checkoutTotalSumPrice.innerText = `${total} VND`;
        itemProductCart.parentNode.removeChild(itemProductCart);
        noProduct.style.display = 'flex';
      } else {
        const total = parseFloat(data.priceProd) + parseFloat(data.fee);
        textCart.innerText = `${data.countProd} items - ${data.priceProd}đ`;
        provisional.innerText = `Tạm tính(${data.countProd} sản phẩm)`;
        sumPrice.innerText = `${data.priceProd} VND`;
        feeTransport.innerText = `${data.fee} VND`;
        checkoutTotalSumPrice.innerText = `${total} VND`;
        itemProductCart.parentNode.removeChild(itemProductCart);
      }
    })
    .catch((err) => console.log(err));
};

const increaseProductItem = function (btn) {
  const productId = btn.parentNode.querySelector('[name="productId"]').value;
  const quantity = btn.parentNode.parentNode.querySelector('.content-quantity');
  const textCart = document.getElementById('quantity-price');
  const provisional = document.querySelector('.checkout__provisional');
  const sumPrice = document.querySelector('.checkout__sum-price');
  const feeTransport = document.querySelector('.checkout__fee-transport');
  const checkoutTotalSumPrice = document.querySelector(
    '.checkout__total-sum-price',
  );
  fetch('/increase-quantity/' + productId, {
    method: 'PATCH',
    headers: {},
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      const total = parseFloat(data.priceProd) + parseFloat(data.fee);
      quantity.innerText = data.quantity;
      textCart.innerText = `${data.countProd} items - ${data.priceProd}đ`;
      provisional.innerText = `Tạm tính(${data.countProd} sản phẩm)`;
      sumPrice.innerText = `${data.priceProd} VND`;
      feeTransport.innerText = `${data.fee} VND`;
      checkoutTotalSumPrice.innerText = `${total} VND`;
    })
    .catch((err) => console.log(err));
};

const decreaseProductItem = function (btn) {
  const productId = btn.parentNode.querySelector('[name="productId"]').value;
  // const csrf = btn.parentNode.querySelector('[name="_csrf"]').value;
  const quantity = btn.parentNode.parentNode.querySelector('.content-quantity');
  const contentCart = document.querySelector('.content-cart');
  const itemProductCart = btn.closest('li');
  const noProduct = document.querySelector('.no-product1');
  const textCart = document.getElementById('quantity-price');
  const provisional = document.querySelector('.checkout__provisional');
  const sumPrice = document.querySelector('.checkout__sum-price');
  const feeTransport = document.querySelector('.checkout__fee-transport');
  const checkoutTotalSumPrice = document.querySelector(
    '.checkout__total-sum-price',
  );
  const lengthProductCart = document
    .querySelector('.cart__list-products')
    .getElementsByTagName('li').length;
  fetch('/decrease-quantity/' + productId, {
    method: 'PATCH',
    headers: {
      // 'csrf-token': csrf,
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      if (data.quantity >= 1) {
        quantity.innerText = data.quantity;
        const total = parseFloat(data.priceProd) + parseFloat(data.fee);
        quantity.innerText = data.quantity;
        textCart.innerText = `${data.countProd} items - ${data.priceProd}đ`;
        provisional.innerText = `Tạm tính(${data.countProd} sản phẩm)`;
        sumPrice.innerText = `${data.priceProd} VND`;
        feeTransport.innerText = `${data.fee} VND`;
        checkoutTotalSumPrice.innerText = `${total} VND`;
      } else {
        if (lengthProductCart < 2) {
          const total = parseFloat(data.priceProd) + parseFloat(data.fee);
          quantity.innerText = data.quantity;
          textCart.innerText = `${data.countProd} items - ${data.priceProd}đ`;
          provisional.innerText = `Tạm tính(${data.countProd} sản phẩm)`;
          sumPrice.innerText = `${data.priceProd} VND`;
          feeTransport.innerText = `${data.fee} VND`;
          checkoutTotalSumPrice.innerText = `${total} VND`;
          itemProductCart.parentNode.removeChild(itemProductCart);
          noProduct.style.display = 'flex';
        } else {
          const total = parseFloat(data.priceProd) + parseFloat(data.fee);
          quantity.innerText = data.quantity;
          textCart.innerText = `${data.countProd} items - ${data.priceProd}đ`;
          provisional.innerText = `Tạm tính(${data.countProd} sản phẩm)`;
          sumPrice.innerText = `${data.priceProd} VND`;
          feeTransport.innerText = `${data.fee} VND`;
          checkoutTotalSumPrice.innerText = `${total} VND`;
          itemProductCart.parentNode.removeChild(itemProductCart);
        }
      }
    })
    .catch((err) => console.log(err));
};

let idTimeout;
const showSuccess = function () {
  const success = document.getElementById('success-message');
  success.style.display = 'block';

  idTimeout = setTimeout(() => {
    success.style.display = 'none';
  }, 3000);
};

const hideSuccess = function () {
  const success = document.getElementById('success-message');
  success.style.display = 'none';

  if (idTimeout) {
    clearTimeout(idTimeout);
  }
};

const addCartProduct = async function (btn) {
  const productId = btn.parentNode.querySelector('[name="productId"]').value;
  const textCart = document.getElementById('quantity-price');
  try {
    const response = await fetch('/cart', {
      method: 'POST',
      body: JSON.stringify({
        id: productId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    textCart.innerText = `${data.countProd} items - ${data.priceProd} VND`;
    showSuccess();
    document.addEventListener('click', hideSuccess, { once: true });
  } catch (err) {
    console.error(err);
  }
};
