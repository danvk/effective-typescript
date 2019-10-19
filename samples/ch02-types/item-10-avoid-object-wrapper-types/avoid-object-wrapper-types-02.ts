function getStringLen(foo: String) {
  return foo.length;
}

getStringLen("hello");  // OK
getStringLen(new String("hello"));  // OK
