function foo(x?: number|string|null) {
  if (!x) {
    x;  // Type is string | number | null | undefined
  }
}
