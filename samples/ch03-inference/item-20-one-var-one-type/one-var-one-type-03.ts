function fetchProduct(id: string) {}
function fetchProductBySerialNumber(id: number) {}
let id: string|number = "12-34-56";
fetchProduct(id);

id = 123456;  // OK
fetchProductBySerialNumber(id);  // OK
