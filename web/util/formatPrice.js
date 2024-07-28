function formatCurrency(amount) {
  if (isNaN(amount)) return amount;
  let amountStr = amount.toString();
  return amountStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

module.exports = { formatCurrency };
