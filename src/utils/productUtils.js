
export const calculateFinalPrice = (price, discount) => {
  const finalPrice = price * (1 - (discount / 100));
  return Math.max(0, finalPrice); // Asegura que el precio nunca sea negativo
};

export const getPriceDetails = (price, discount) => {
  const regularPrice = Number(price);
  const discountVal = Number(discount) || 0;

  // Validar si el descuento es aplicable (entre 1 y 100)
  if (discountVal > 0 && discountVal <= 100) {
    const finalPrice = calculateFinalPrice(regularPrice, discountVal);
    return {
      finalPrice: finalPrice,
      regularPrice: regularPrice,
      isDiscounted: true,
      discount: discountVal
    };
  }

  // Si no hay descuento o es inválido, el precio final es el precio regular
  return {
    finalPrice: regularPrice,
    regularPrice: regularPrice,
    isDiscounted: false,
    discount: 0
  };
};