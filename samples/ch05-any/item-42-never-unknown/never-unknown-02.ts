function parseYAML(yaml: string): any {
  // ...
}
interface Book {
  name: string;
  author: string;
}
const book: Book = parseYAML(`
  name: Wuthering Heights
  author: Emily Brontë
`);
