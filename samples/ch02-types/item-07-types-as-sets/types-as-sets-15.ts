function getKey<K extends string>(val: any, key: K) {
  // ...
}
getKey({}, 'x');  // OK, 'x' extends string
getKey({}, Math.random() < 0.5 ? 'a' : 'b');  // OK, 'a'|'b' extends string
getKey({}, document.title);  // OK, string extends string
getKey({}, 12);
        // ~~ Type '12' is not assignable to parameter of type 'string'
