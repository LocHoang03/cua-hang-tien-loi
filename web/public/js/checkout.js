// This is your test secret API key.
require('dotenv').config();
// const stripe = require('stripe')(process.env.STRIPE_KEY);
// Create a Checkout Session
async function initialize() {
  const stripe = await Stripe(
    'pk_test_51NZxakFZc1P48npZkG7B7BdO9YeyYkIFcDSQYw7Ig0Q9qGACPPyIzP5C9qOQRsni67h3tB1BvDNhTUqWeqgc6uql00Q48KCjKl',
  );
  const response = await fetch('/create-checkout-session', {
    method: 'POST',
  });
  const { clientSecret } = await response.json();
  const checkout = await stripe.initEmbeddedCheckout({
    clientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}
