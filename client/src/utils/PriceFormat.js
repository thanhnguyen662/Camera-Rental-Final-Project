const priceFormat = (number) => {
   return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
   }).format(number || 0);
};

export default priceFormat;
