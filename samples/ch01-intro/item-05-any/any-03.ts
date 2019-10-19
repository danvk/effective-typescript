   let age: number;
   age = '12';
// ~~~ Type '"12"' is not assignable to type 'number'
   age = '12' as any;  // OK
function calculateAge(birthDate: Date): number {
  // COMPRESS
  return 0;
  // END
}

let birthDate: any = '1990-01-19';
calculateAge(birthDate);  // OK

