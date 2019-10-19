declare let hasMiddle: boolean;
const firstLast = {first: 'Harry', last: 'Truman'};
function addOptional<T extends object, U extends object>(
  a: T, b: U | null
): T & Partial<U> {
  return {...a, ...b};
}

const president = addOptional(firstLast, hasMiddle ? {middle: 'S'} : null);
president.middle  // OK, type is string | undefined
