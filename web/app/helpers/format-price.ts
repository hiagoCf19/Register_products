export interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  quantity_in_stock: number;
}
export const calculateProducTotalPrice = (product: Products): number => {
  if (product.discount === 0) {
    return product.price;
  }
  const discount = product.price * (product.discount / 100);
  return product.price - discount;
};
export const formatCurrency = (value: number): string => {
  return `R$${Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value)}`;
};
export const calculateDiscount = (product: Products): number => {
  return product.price * (product.discount / 100);
};
