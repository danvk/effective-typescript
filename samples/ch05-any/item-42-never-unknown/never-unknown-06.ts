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
