/**
 * Indian Rupee (INR) formatting utility conforming to Indian numbering system (Lakhs and Crores)
 */
export function formatINR(price, purpose = 'Buy') {
  if (!price && price !== 0) return '₹0';
  if (typeof price === 'string' && price.startsWith('₹')) {
    return price;
  }
  const num = Number(price);
  if (isNaN(num)) return `₹${price}`;

  if (purpose === 'Rent') {
    if (num >= 100000) {
      const lakh = (num / 100000).toFixed(2).replace(/\.00$/, '');
      return `₹${lakh} Lakh/month`;
    }
    return `₹${num.toLocaleString('en-IN')}/month`;
  }

  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2).replace(/\.00$/, '');
    return `₹${cr} Cr`;
  } else if (num >= 100000) {
    const lakh = (num / 100000).toFixed(2).replace(/\.00$/, '');
    return `₹${lakh} Lakh`;
  } else {
    return `₹${num.toLocaleString('en-IN')}`;
  }
}
