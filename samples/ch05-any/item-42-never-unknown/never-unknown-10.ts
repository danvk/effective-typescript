function parseYAML(yaml: string): any {
  // ...
}
function safeParseYAML<T>(yaml: string): T {
  return parseYAML(yaml);
}
