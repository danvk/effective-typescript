interface Person { name: string };
const alice: Person = {
  name: 'Alice',
  occupation: 'TypeScript developer'
// ~~~~~~~~~ Object literal may only specify known properties
//           and 'occupation' does not exist in type 'Person'
};
const bob = {
  name: 'Bob',
  occupation: 'JavaScript developer'
} as Person;  // No error
