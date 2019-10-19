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
function processValue(val: unknown) {
  if (val instanceof Date) {
    val  // Type is Date
  }
}
