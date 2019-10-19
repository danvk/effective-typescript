declare function shallowEqual(a: any, b: any): boolean;
function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[]|null = null;
  let lastResult: any;
  return function(...args: any[]) {
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~
      //          Type '(...args: any[]) => any' is not assignable to type 'T'
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  };
}
