interface Person { name: string };
const people = ['alice', 'bob', 'jan'].map(name => ({} as Person));
// No error
