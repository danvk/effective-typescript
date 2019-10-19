function parseYAML(yaml: string): any {
  // ...
}
interface Book {
  name: string;
  author: string;
}
const book = parseYAML(`
  name: Jane Eyre
  author: Charlotte Brontë
`);
alert(book.title);  // No error, alerts "undefined" at runtime
book('read');  // No error, throws "TypeError: book is not a
               // function" at runtime
