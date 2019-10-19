interface Person {
  first: string;
  last: string;
}
function email({
  person: Person,
       // ~~~~~~ Binding element 'Person' implicitly has an 'any' type
  subject: string,
        // ~~~~~~ Duplicate identifier 'string'
        //        Binding element 'string' implicitly has an 'any' type
  body: string}
     // ~~~~~~ Duplicate identifier 'string'
     //        Binding element 'string' implicitly has an 'any' type
) { /* ... */ }
