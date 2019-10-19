interface Person { name: string };
const people = ['alice', 'bob', 'jan'].map(
  (name): Person => ({name})
); // Type is Person[]
