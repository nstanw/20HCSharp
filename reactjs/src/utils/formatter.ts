const formatter = new Intl.NumberFormat('vi-VI', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
});
export default formatter;