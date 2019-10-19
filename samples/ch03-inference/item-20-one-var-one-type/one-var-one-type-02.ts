function fetchProduct(id: string) {}
function fetchProductBySerialNumber(id: number) {}
   let id = "12-34-56";
   fetchProduct(id);

   id = 123456;
// ~~ '123456' is not assignable to type 'string'.
   fetchProductBySerialNumber(id);
                           // ~~ Argument of type 'string' is not assignable to
                           //    parameter of type 'number'
