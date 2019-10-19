interface Product {
  id: string;
  name: string;
  price: number;
}
function logProduct(product: Product) {
  const {id, name, price} = product;
  console.log(id, name, price);
}
