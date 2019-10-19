interface Person { name: string };
const alice: Person = {};
   // ~~~~~ Property 'name' is missing in type '{}'
   //       but required in type 'Person'
const bob = {} as Person;  // No error
