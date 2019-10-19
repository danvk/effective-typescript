function contains(text: string, search: string|RegExp) {
  if (search instanceof RegExp) {
    search  // Type is RegExp
    return !!search.exec(text);
  }
  search  // Type is string
  return text.includes(search);
}
