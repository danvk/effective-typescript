// tsConfig: {"noImplicitAny":true,"strictNullChecks":false}

// HIDE
class Chart {
  indices: number[];
// END
getRanges() {
  for (const r of this.indices) {
    const low = r[0];
             // ~~~~ Element implicitly has an 'any' type because
             //      type 'Number' has no index signature
    const high = r[1];
              // ~~~~ Element implicitly has an 'any' type because
              //      type 'Number' has no index signature
    // ...
  }
}
// HIDE
}
// END
