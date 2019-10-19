function fetchProduct(id: string) {}
function fetchProductBySerialNumber(id: number) {}
const id = "12-34-56";
fetchProduct(id);

{
  const id = 123456;  // OK
  fetchProductBySerialNumber(id);  // OK
}
