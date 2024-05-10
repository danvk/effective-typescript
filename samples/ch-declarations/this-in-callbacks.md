# Item 69: Provide a Type for this in Callbacks if It's Part of Their API

## Things to Remember

- Understand how `this` binding works.
- Provide a type for `this` in callbacks if it's part of your API.
- Avoid dynamic `this` binding in new APIs.

## Code Samples

```ts
class C {
  vals = [1, 2, 3];
  logSquares() {
    for (const val of this.vals) {
      console.log(val ** 2);
    }
  }
}

const c = new C();
c.logSquares();
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEDC0G8BQ1oDcwhgXmgbQEYAaaAJhIGYBdAbhWhAHsBzAZQEcBXMAJwFMIACgCUieqgBmjHtEHBGAOwgAXdJmiMJ0ZQAsAlhAB0GLKOSoL0eUsYg+hps0EnoAKldlhdSwF96fvyRrFStoXAU+AHc4ETpgBxYObn4hLyQgA)

----

```ts
const c = new C();
const method = c.logSquares;
method();
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEDC0G8BQ1oDcwhgXmgbQEYAaaAJhIGYBdAbhWhAHsBzAZQEcBXMAJwFMIACgCUieqgBmjHtEHBGAOwgAXdJmiMJ0ZQAsAlhAB0GLKOSoL0eUsYg+hps0EnoAKldlhdSwF96fv2sVK2hcBT4AdzgROiDVAFs+XUYAE1CrBxYObn4IOkTklJikIA)

----

```ts
const c = new C();
const method = c.logSquares;
method.call(c);  // Logs the squares again
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEDC0G8BQ1oDcwhgXmgbQEYAaaAJhIGYBdAbhWhAHsBzAZQEcBXMAJwFMIACgCUieqgBmjHtEHBGAOwgAXdJmiMJ0ZQAsAlhAB0GLKOSoL0eUsYg+hps0EnoAKldlhdSwF96fv2sVK2hcBT4AdzgROiDVAFs+XUYAE1CrBxYObn4IOkTklMNgTBA5L1QAekroABkWGF0+aAguXgFoMGYwPQUkIA)

----

```ts
document.querySelector('input')?.addEventListener('change', function(e) {
  console.log(this);  // Logs the input element on which the event fired.
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEDC0G8BQ1oDcwhgXmgbQEYAaaAJhIGYBdAbhWhAHsBzAZQEcBXMAJwFMIACgCUieqgBmjHtEHBGAOwgAXdJmiMJ0ZQAsAlhAB0GLKOSoL0eUsYg+hps0EnoAKldlhdSwF96fvwATRmBOAFs+BWVDLj4eAE9WPjtgZWlBAHI9BQAHTmUM4QB+QzBAwIBRNEjlABkDZUi4zOAdMAVmPgySCU4FVL1FQT4zemsIW3tHQV0DL1QAegXoWpYYXT5obLzVZL4IqI0FaAB3fVbtHU2+asOJPX5AwyQfLyQgA)

----

```ts
class ResetButton {
  render() {
    return makeButton({text: 'Reset', onClick: this.onClick});
  }
  onClick() {
    alert(`Reset ${this}`);
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoBrEAIWQwzwAoAHGHOgZwC54BvDEADw3eYYYWVAHMANPDwBhCFjDF2NAJTwAvAD54ANxxZg8AL7L2u-QG4AUJCjNm8AEohmIDBSp5Ol+PDipQMCpePj5wGMgw+ESk7tSoNFy8-PAA5E4uGCmSMnIK7BgAFljMAHQ58sTGVj6G3lKoshVBHHU+UBAgMBg0AAbprvAAJFxFzIY9ytVGlrVAA)

----

```ts
class ResetButton {
  constructor() {
    this.onClick = this.onClick.bind(this);
  }
  render() {
    return makeButton({text: 'Reset', onClick: this.onClick});
  }
  onClick() {
    alert(`Reset ${this}`);
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoBrEAIWQwzwAoAHGHOgZwC54BvDEADw3eYYYWVAHMANPDwBhCFjDF2NAJTwAvAD54ANxxZg8AL7L2u-QG4AUJCjNm8AEohmIDBSp5Ol+PDB5BMMiYODAqXj4+GAAWWMwAdDJyCurw0bEJqLLyxHEARiLANGnMylY+ht7wcKigoaoclT5wGMgw+ESk7tSoNFy8-PAA5E4uGIOSidnsxRlZCsZlRpWTCmENEfBQECAwGDQABiOu8AAkXDHMhvullRUVQA)

----

```ts
class ResetButton {
  render() {
    return makeButton({text: 'Reset', onClick: this.onClick});
  }
  onClick = () => {
    alert(`Reset ${this}`); // "this" refers to the ResetButton instance.
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5&alwaysStrict=false&moduleResolution=2&module=99&target=8#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXwFsoBrEAIWQwzwAoAHGHOgZwC54BvDEADw3eYYYWVAHMANPDwBhCFjDF2NAJTwAvAD54ANxxZg8AL7L2u-QG4AUJCjNm8AEohmIDBSp5Ol+PDipQMCpePj5wGMgw+ESk7tSoNFy8-PAA5E4uGCmSMnIK7BgAFljMAHQ58sTGVj6G3lKoshXq8EGawSFQECAwGDQABumu8AAkXEXMhn3K5vAA9LPwAESFxYu+IIjd9tTwhQiDbpRx8CKCUOggJXW1tUA)

----

```js
class ResetButton {
  constructor() {
    this.onClick = () => {
      alert(`Reset ${this}`); // "this" refers to the ResetButton instance.
    };
  }
  render() {
    return makeButton({ text: 'Reset', onClick: this.onClick });
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYGwhgzhAEBKCmF4BcBCBXZyD2A7aA3gFDTTB4TIBO6wOVAFAJSEmnTIAWAlhAHR4AwiG7AA1tAC80ZlIB8rduzAh4VZAwAGCJMmgASAl14BfTUwDc0APTXoAImMR70KvABmamDg6d4cRBQMLDxoblxKMFxgeD42UhMLNhM2N1wAEzVZYiU3ZHQqfABbMDF4YJxcBgIOeAAPZAAuaAByHRQWgBpoIRFxZqcBXGFRCRNLZKIUoA)

----

```ts
function addKeyListener(
  el: HTMLElement,
  listener: (this: HTMLElement, e: KeyboardEvent) => void
) {
  el.addEventListener('keydown', e => listener.call(el, e));
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAQwCaoNIFMCeAZGAZyizCwCcAKAKEUSwBsAuRACQBUBZPAUQawC2pKABpaiBkRJlyLSlAAWRFh259BwkfRbYcAIzjJyqHgDdhASkQBeAHyJTcGKmpWA3uMYA6NCfNgoAmJSCkoAcgBrXFQ4AHcwMK0sG3tJYJkvCGQGBkpGJIsLAG5qAF9qIA)

----

```ts
function addKeyListener(
  el: HTMLElement,
  listener: (this: HTMLElement, e: KeyboardEvent) => void
) {
  el.addEventListener('keydown', e => {
    listener(el, e);
    //           ~ Expected 1 arguments, but got 2
  });
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAQwCaoNIFMCeAZGAZyizCwCcAKAKEUSwBsAuRACQBUBZPAUQawC2pKABpaiBkRJlyLSlAAWRFh259BwkfRbYcAIzjJyqHgDdhASkQBeAHyJTcGKmpWA3uMYA6NCfNgoAmJSCkoAcgBrXFQ4AHcwMK0sG3sPOjpJYJlKRiSLAG5xOgB6YvTy8oA-RB4ADwAHLGgsVEQARhRyAHMQIQDCLT0QKEQuuBGAJnEAXwLqaeogA)

----

```ts
function addKeyListener(
  el: HTMLElement,
  listener: (this: HTMLElement, e: KeyboardEvent) => void
) {
  el.addEventListener('keydown', e => {
    listener(e);
    // ~~~~~~~~ The 'this' context of type 'void' is not assignable
    //          to method's 'this' of type 'HTMLElement'
  });
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAQwCaoNIFMCeAZGAZyizCwCcAKAKEUSwBsAuRACQBUBZPAUQawC2pKABpaiBkRJlyLSlAAWRFh259BwkfRbYcAIzjJyqHgDdhASkQBeAHyJTcGKmpWA3uMYA6NCfNgoAmJSCkoAcgBrXFQ4AHcwMK0sG3sPOjpJYJlKLAsAbnE6AHoixAA-CsqKxHYFZLDFIjDECAQSAA8oRDhgRCgcAAd6x2dmokQwOC7kQkIYAHMwZD1+QsQS9M30qDhEIUU4VDDCRAalQmaevsH61V5+IQCw8QBffOoX6iA)

----

```ts
declare let el: HTMLElement;
addKeyListener(el, function(e) {
  console.log(this.innerHTML);
  //          ^? this: HTMLElement
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAQwCaoNIFMCeAZGAZyizCwCcAKAKEUSwBsAuRACQBUBZPAUQawC2pKABpaiBkRJlyLSlAAWRFh259BwkfRbYcAIzjJyqHgDdhASkQBeAHyJTcGKmpWA3uMYA6NCfNgoAmJSCkoAcgBrXFQ4AHcwMK0sG3sPOjpJYJlKLAsAbnE6AHoixAA-CsqKxHYFZLDFIjDECAQSAA8oRDhgRCgcAAd6x2dmokQwOC7kQkIYAHMwZD1+QsQS9M30qDhEIUU4VDDCRAalQmaevsH61V5+IQCw8QBffOoX6lQsCAYjZP4XUYKi49w0AQKvl0QWkoUYWlAkFgCBy7nErTAhDg-C8DDg83k5y8MDAMju72KpS2mwAegB+PrnEFqB7CD7vIA)

----

```ts
class Foo {
  registerHandler(el: HTMLElement) {
    addKeyListener(el, e => {
      console.log(this.innerHTML);
      //               ~~~~~~~~~ Property 'innerHTML' does not exist on 'Foo'
    });
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/GYVwdgxgLglg9mABAQwCaoNIFMCeAZGAZyizCwCcAKAKEUSwBsAuRACQBUBZPAUQawC2pKABpaiBkRJlyLSlAAWRFh259BwkfRbYcAIzjJyqHgDdhASkQBeAHyJTcGKmpWA3uMYA6NCfNgoAmJSCkoAcgBrXFQ4AHcwMK0sG3sPOjpJYJlKLAsAbnE6AHoixAA-CsqKxHYFZLDFIjDECAQSAA8oRDhgRCgcAAd6x2dmokQwOC7kQkIYAHMwZD1+QsQS9M30qDhEIUU4VDDCRAalQmaevsH61V5+IQCw8QBffOoX6ggGGZOAMTguzSiHIWHmUgorGQYFQ-CojBUXHuGgC7jWvl0QWkoUYSRSiGBm1aYEIcH4XgYcHm8nOXhgYBkd3eW3WpRZ7PKVSqiAACuQ4ENyP1TvTGUjmjEsCdJl0sO0pN0kGEAXBnps3gU6J9PkA)
