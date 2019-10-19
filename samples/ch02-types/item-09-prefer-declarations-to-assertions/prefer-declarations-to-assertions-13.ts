interface Person { name: string; }
const el = document.body as unknown as Person;  // OK
