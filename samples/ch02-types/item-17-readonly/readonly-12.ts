let obj: {readonly [k: string]: number} = {};
// Or Readonly<{[k: string]: number}
obj.hi = 45;
//  ~~ Index signature in type ... only permits reading
obj = {...obj, hi: 12};  // OK
obj = {...obj, bye: 34};  // OK
