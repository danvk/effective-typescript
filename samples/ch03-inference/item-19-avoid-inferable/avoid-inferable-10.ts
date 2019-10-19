interface Product {
  id: string;
  name: string;
  price: number;
}
function logProduct(product: Product) {
  const {id, name, price}: {id: string; name: string; price: number } = product;
  console.log(id, name, price);
}
