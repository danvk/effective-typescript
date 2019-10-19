interface Person { name: string };
const people: Person[] = ['alice', 'bob', 'jan'].map(
  (name): Person => ({name})
);
