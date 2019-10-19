function isGreeting(phrase: String) {
  return [
    'hello',
    'good day'
  ].includes(phrase);
          // ~~~~~~
          // Argument of type 'String' is not assignable to parameter
          // of type 'string'.
          // 'string' is a primitive, but 'String' is a wrapper object;
          // prefer using 'string' when possible
}
