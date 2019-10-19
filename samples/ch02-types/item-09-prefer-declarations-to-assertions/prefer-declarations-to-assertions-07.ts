interface Person { name: string };
const people = ['alice', 'bob', 'jan'].map(name => {
  const person: Person = {name};
  return person
}); // Type is Person[]
