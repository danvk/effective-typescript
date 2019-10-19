function fetchProduct(id: string) {}
function fetchProductBySerialNumber(id: number) {}
const id = "12-34-56";
fetchProduct(id);

const serial = 123456;  // OK
fetchProductBySerialNumber(serial);  // OK
