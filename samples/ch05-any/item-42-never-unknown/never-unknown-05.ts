function parseYAML(yaml: string): any {
  // ...
}
interface Book {
  name: string;
  author: string;
}
function safeParseYAML(yaml: string): unknown {
  return parseYAML(yaml);
}
const book = safeParseYAML(`
  name: Villette
  author: Charlotte Brontë
`) as Book;
alert(book.title);
        // ~~~~~ Property 'title' does not exist on type 'Book'
book('read');
// ~~~~~~~~~ this expression is not callable
