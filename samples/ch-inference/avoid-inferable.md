# Item 18: Avoid Cluttering Your Code with Inferable Types

## Things to Remember

- Avoid writing type annotations when TypeScript can infer the same type.
- Ideal TypeScript code has type annotations in function/method signatures but not on local variables in their bodies.
- Consider using explicit annotations for object literals to enable excess property checking and ensure errors are reported close to where they occur.
- Don't annotate function return types unless the function has multiple returns, is part of a public API, or you want it to return a named type.


## Code Samples

```ts
let x: number = 12;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/DYUwLgBAHgXBB2BXAtgIxAJwgXggRgCYBuAKCA)

----

```ts
let x = 12;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/DYUwLgBAHhC8EEYBMBuAUEA)

----

```ts
const person: {
  name: string;
  born: {
    where: string;
    when: string;
  };
  died: {
    where: string;
    when: string;
  }
} = {
  name: 'Sojourner Truth',
  born: {
    where: 'Swartekill, NY',
    when: 'c.1797',
  },
  died: {
    where: 'Battle Creek, MI',
    when: 'Nov. 26, 1883'
  }
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBADgUwE4XALhgbwFAxmAQwFsENokBLMAcwG5cYAjEJMDHPPAdwAtlSY5KnQbc+bQVEo16eAL6yYAEwoIl7UTF78yU4YrEIJQmQznY5MALxYGhEhgDkAZRAArEAFdWyGABUkTygeRwAaBmZWDU4tPiQBFy4CJCgEAGsKABtM0JgAOQBNMM1tCUdgADoARgB2AE4a4vlwvBU1aM5teKcAIQIoKEyEGABhePTcgFkASSbO8Sc8kAA3CpgAJgA2XKqADl2AZkczC3ogA)

----

```ts
const person = {
  name: 'Sojourner Truth',
  born: {
    where: 'Swartekill, NY',
    when: 'c.1797',
  },
  died: {
    where: 'Battle Creek, MI',
    when: 'Nov. 26, 1883'
  }
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBADgUwE4XDAvDA3gKBjMAQwFsEAuGAcgGUQArEAVyTGRgBUlGoALSgGjwwARiBYVc+fAHceyclWrTCSKAgDWASwA22-jAByATQFCZcsBUrAAdAEYA7AE4Hp-AF9B+ACaaE3iTMYWXkrACFCKChtBBgAYSQEDX0AWQBJNykQyyoDEAA3GxgAJgA2fTsADkqAZkohdxx3AG4cIA)

----

```ts
function square(nums: number[]) {
  return nums.map(x => x * x);
}
const squares = square([1, 2, 3, 4]);
//    ^? const squares: number[]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAZwI4gIYCcCmAKMEAW2QC5FCiAjHLAbQF0BKRAbwChFFcoQslKyAHREMABzwAPRAF4AfImkAqRUwDc7AL7sICZFBTpsOZLMOZceOgEYANIgBM9gMz2ALMw0B6L1y4A9AH5EXTB9c2MyCmIaegZ2IA)

----

```ts
const axis1: string = 'x';
//    ^? const axis1: string
const axis2 = 'y';
//    ^? const axis2: "y"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBAhgDwJYQIwC4bQE5LAcxgF4YByBUgbgCgB6WmRmAPQH4ZRJZEUMspcBap2jxkEAEzEyATyp0GTNh3CiekzACIZm6kA)

----

```ts
interface Product {
  id: number;
  name: string;
  price: number;
}

function logProduct(product: Product) {
  const id: number = product.id;
  const name: string = product.name;
  const price: number = product.price;
  console.log(id, name, price);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgApQPYBMCuCzIDeAUMssFgFzIg4C2ARtANyk1x0TUDOYUoAc1ZkADvyTVajFsQC+xYjBwh8wDCGQAbDAPTY8YABRj9+antz4AlETYJ1vclRr0mUZAF5kJy2AB0FMLI9iCOIBxcyLz8IAKe3pi+fuGcQSGOYsASLtLuXj4GfplIaQ4YmhB+2gKGFAA07JwNxRBWrPJAA)

----

```ts
interface Product {
  id: string;
  name: string;
  price: number;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgApQPYBMCuCzIDeAUMssFgFzIDOYUoA5gNynIhwC2E1dDILNgAcGSaiBycARtFYBfYkA)

----

```ts
function logProduct(product: Product) {
  const id: number = product.id;
     // ~~ Type 'string' is not assignable to type 'number'
  const name: string = product.name;
  const price: number = product.price;
  console.log(id, name, price);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgApQPYBMCuCzIDeAUMssFgFzIDOYUoA5gNynIhwC2E1dDILNgAcGSaiBycARtFYBfYjBwh8wDCGQAbDI3TY8YABQj9+antz4AlETYJ1dclXaSZUZAF5kJy2AB0FKxkwQD0IcgAfhHIACoAnkIoAOR8TEnkNOwYBHA0NMCMHFKaKGAYyGAJyRLS0El2DgQc3Lz0TJ7emL5+zRBByPYgjiLAYi617l4+Bn4jSP2DNBglftqMhhQANOxcENtzEFbyxEA)

----

```ts
function logProduct(product: Product) {
  const {id, name, price} = product;
  console.log(id, name, price);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgApQPYBMCuCzIDeAUMssFgFzIDOYUoA5gNynIhwC2E1dDILNgAcGSaiBycARtFYBfYjBwh8wDCGQAbDI3TY8YABQj9+antz4AlETYJ1dIhQA07LhFcjgSOcgC8yCaWYKxk9iA0GJoQAHTajIYubtyeohBW8sRAA)

----

```ts
function logProduct(product: Product) {
  const {id, name, price}: {id: string; name: string; price: number } = product;
  console.log(id, name, price);
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgApQPYBMCuCzIDeAUMssFgFzIDOYUoA5gNynIhwC2E1dDILNgAcGSaiBycARtFYBfYjBwh8wDCGQAbDI3TY8YABQj9+antz4AlETYJ1dIhQA07LhFcjgSOdUIVeeiZmN25A-hZkLzF2SRkoZDlkAF4ozEswVjJ7EBoMTQgAOm1GQxdQjzTvCCt5YiA)

----

```ts
function parseNumber(str: string, base=10) {
  //                              ^? (parameter) base: number
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABABwIYCcDOBTAciAWwCNt0AKTKdALkUvRjAHMAaRI1HAXgEYAGAJSIA3gChEiAPSSJsufIWLZAPQD8iMmnSoC2KKSEcctMIRLpxUmQDpbogL6igA)

----

```ts
// Don't do this:
app.get('/health', (request: express.Request, response: express.Response) => {
  response.send('OK');
});

// Do this:
app.get('/health', (request, response) => {
  //                ^? (parameter) request: Request<...>
  response.send('OK');
  // ^? (parameter) response: Response<...>
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYWwDg9gTgLgBAUwB5iggzuuAzKERwDkyqG6hA3AFADGEAduvAIZhhwC8iKamAFAEpqAemFwAIg0LwAJhDgwAFsHQAuKqzAA6AOYIYfQsMUJmAGyWEANHD5oAjgFcMMVd1KYtAJQROXN3khGBDcSXnRvDCD0BAFOAD44AG8qODhAhhitGPoZQwB5AGlCISoAX1KqUQl5JRV1TV19Q2NTC0VrWwdnJgCozNiE5NS4arTxicm4AD0AflswZihmEH0EKDjulzcfPyYAHi0j+JGM4OyEXILi0rTquYWllbWN9P7gnfeYw+Py0qA)

----

```ts
const elmo: Product = {
  name: 'Tickle Me Elmo',
  id: '048188 627152',
  price: 28.99,
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgApQPYBMCuCzIDeAUMssFgFzIDOYUoA5gNynIhwC2E1dDILNgAcGSaiBycARtFYBfYjBwh8wDCGQAbDI3TY8YABQj9+antz4AlETYJ1dIhQA07LhFcjgSOcgC8yCaWYKxk9iA0GJoQAHTajIYubtyeohBW8sThjhCanBjmmMH+tmQc3NQA5AAq3gDW0cgAsigAonkYlc5sFFUADAAsABwAjENDyABsAEwA7CMArNNdwmnU00MxAJxb3XKsQA)

----

```ts
const furby = {
  name: 'Furby',
  id: 630509430963,
  price: 35,
};
logProduct(furby);
//         ~~~~~ Argument ... is not assignable to parameter of type 'Product'
//               Types of property 'id' are incompatible
//               Type 'number' is not assignable to type 'string'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgApQPYBMCuCzIDeAUMssFgFzIDOYUoA5gNynIhwC2E1dDILNgAcGSaiBycARtFYBfYjBwh8wDCGQAbDI3TY8YABQj9+antz4AlETYJ1dIhQA07LhFcjgSOcgC8yCaWYKxk9iA0GJoQAHTajIYubtyeohBW8sThjkpQUgCe-rZkHNzUAOQAYjh5+eXObBTUAGwAzAAMAKztAJwALB09bQ1kXmLIrZ0NcqzxFgaGuQUZxAD0q2SbWwB+u7vIAIJQjJIQ4Mgxl+Q07BgEcDQ0wIwcUtHIYBiBcFDukFDIDAwD75IQocrzfDlNYbLZwuEAFVBEBuQMCmDBUDAhXKFHKyB+KFA9k4QjgYGAbwgMPhtLISLByHKEmk0HxwBuIDuBMez1e70+IMZ5T4TGhQA)

----

```ts
const furby: Product = {
   name: 'Furby',
   id: 630509430963,
// ~~ Type 'number' is not assignable to type 'string'
   price: 35,
};
logProduct(furby);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgApQPYBMCuCzIDeAUMssFgFzIDOYUoA5gNynIhwC2E1dDILNgAcGSaiBycARtFYBfYjBwh8wDCGQAbDI3TY8YABQj9+antz4AlETYJ1dIhQA07LhFcjgSOcgC8yCaWYKxk9iA0GJoQAHTajIYubtyeohBW8sThjkpQUgCe5pjB-rZkyTzIAOQAYjh5+VXObORUyABsAMwADACs3QCcACw9A13NAPQTyAB+M8gAKvlCKFUS0tBV5DTsGARwNDTAjBxS0chgGBfLq3xMVS1eYsidvc1yrPEWBoa5BRnEIA)

----

```ts
function getQuote(ticker: string) {
  return fetch(`https://quotes.example.com/?q=${ticker}`)
      .then(response => response.json());
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAcwKZQIojlVAKWCAa1QCcAuRAZylJjGQEpEBvAKEUVPRFKWHQQAFngAGQqFAAOVcgHo5AR2y4qAOlQAPAIYBbKQBtUaiHF1yA-IoC8AEhaESpAL6jGHTp7VQhqMHm4qKQQqVERrAD4uVCCQ4wArKgQ8RkYAbjZnNiA)

----

```ts
const cache: {[ticker: string]: number} = {};
function getQuote(ticker: string) {
  if (ticker in cache) {
    return cache[ticker];
  }
  return fetch(`https://quotes.example.com/?q=${ticker}`)
      .then(response => response.json())
      .then(quote => {
        cache[ticker] = quote;
        return quote as number;
      });
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMCGwAWBTAXDA3gbSgS2AGsUAnDaEvMAcwF0MwBXAWwCNSBfGAXiw4G4AUADNGYYPnAxqKKAEVGIKCgAU+IqXJRKNAJRZBMGHmEw1BYiWNg4iVPsyGjMErMYkbCZClwXStISMOJ1codxthWWQVAAMkKCgABwg0AHpUgEdFZQgAOhQAD3hmRIAbFFzQZlSAfgzuABJMdUsOGN0nZxhcqFQwFVcIRPAIFB4APhcUIZGKgCsIcBVdDq6jHr6VLKUx7knHNecvVF8NEloeGG3lQMOpsI8r7LH4CBgmNlJbro5dIWCgA)

----

```ts
getQuote;
// ^? function getQuote(ticker: string): number | Promise<number>
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMCGwAWBTAXDA3gbSgS2AGsUAnDaEvMAcwF0MwBXAWwCNSBfGAXiw4G4AUADNGYYPnAxqKKAEVGIKCgAU+IqXJRKNAJRZBMGHmEw1BYiWNg4iVPsyGjMErMYkbCZClwXStISMOJ1codxthWWQVAAMkKCgABwg0AHpUgEdFZQgAOhQAD3hmRIAbFFzQZlSAfgzuABJMdUsOGN0nZxhcqFQwFVcIRPAIFB4APhcUIZGKgCsIcBVdDq6jHr6VLKUx7knHNecvVF8NEloeGG3lQMOpsI8r7LH4CBgmNlJbro5dIWCZPJnkJ0jAAHo1GCicSSGyAhQ7cxnLQ6ai6BgsdhWAA+MAACiQQMw8KMADwfLHjQRAA)

----

```ts
getQuote('MSFT').then(considerBuying);
//               ~~~~ Property 'then' does not exist on type
//                    'number | Promise<number>'
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMCGwAWBTAXDA3gbSgS2AGsUAnDaEvMAcwF0MwBXAWwCNSBfGAXiw4G4AUADNGYYPnAxqKKAEVGIKCgAU+IqXJRKNAJRZBMGHmEw1BYiWNg4iVPsyGjMErMYkbCZClwXStISMOJ1codxthWWQVAAMkKCgABwg0AHpUgEdFZQgAOhQAD3hmRIAbFFzQZlSAfgzuABJMdUsOGN0nZxhcqFQwFVcIRPAIFB4APhcUIZGKgCsIcBVdDq6jHr6VLKUx7knHNecvVF8NEloeGG3lQMOpsI8r7LH4CBgmNlJbro5dIWDROJJJ4RngACakABCjAAnlRqCoChh4GAYQ5gjJ5M8VAByACyAGUAGIAFRxug2KH6oEg4KhsPhf0E6TurIAfhy2TAAAokECJUhQGEwHG9Kk4mBgkDTd5KGCFPDQGBSIUC5mpVma5w4j7sKwAHx5fOYipQAB5daRxjjBEA)

----

```ts
const cache: {[ticker: string]: number} = {};
function getQuote(ticker: string): Promise<number> {
  if (ticker in cache) {
    return cache[ticker];
    // ~~~ Type 'number' is not assignable to type 'Promise<number>'
  }
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMCGwAWBTAXDA3gbSgS2AGsUAnDaEvMAcwF0MwBXAWwCNSBfGAXiw4G4AUADNGYYPnAxqKKAEVGIKCgAU+IqXJRKNAJQYACiRDM8EFAB4mbUgD4sgmDDzCYagsRLOwcRKl0OTk4ksowkPgjIKLgepLRCQTAA9EkwAH4ZMAAqAJ4ADigwAOTW7CRFzhAwYEow8BAQeNRg8KwANoVQIDBQ+YVFRiZmlqV2RY4wHBMpMADCAPIAsgYASgCiAMobEyFQYT6DpuYAdCEQIG0AbqoADLoJyalrAHIAIoJTgkA)

----

```ts
interface Vector2D { x: number; y: number; }
function add(a: Vector2D, b: Vector2D) {
  return { x: a.x + b.x, y: a.y + b.y };
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGoQWA9lATAEWQG9kAPALmRAFcBbAI2gG5kBPSmh55AXwCgY1EJmBYQyOABNJACjiV0mHAQA0yegozY8+AJTE+yZFAhhqUcSQoSAdKWQBqdXbXtbrR8488mffkA)
