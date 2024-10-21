const formatterDouble = function (digit) {    
    return new Intl.NumberFormat('vi-VI', { minimumFractionDigits: 0, maximumFractionDigits: digit || 2 })

} 
export default formatterDouble;
