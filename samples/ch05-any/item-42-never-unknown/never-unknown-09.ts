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
interface Geometry {}
function isBook(val: unknown): val is Book {
  return (
      typeof(val) === 'object' && val !== null &&
      'name' in val && 'author' in val
  );
}
function processValue(val: unknown) {
  if (isBook(val)) {
    val;  // Type is Book
  }
}
