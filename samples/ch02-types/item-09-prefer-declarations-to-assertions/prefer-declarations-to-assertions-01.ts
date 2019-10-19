interface Person { name: string };

const alice: Person = { name: 'Alice' };  // Type is Person
const bob = { name: 'Bob' } as Person;  // Type is Person
