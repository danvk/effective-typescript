# Item 16: Prefer More Precise Alternatives to Index Signatures

## Things to Remember

- Understand the drawbacks of index signatures: much like `any`, they erode type safety and reduce the value of language services.
- Prefer more precise types to index signatures when possible: ++interface++s, `Map`, ++Record++s, mapped types, or index signatures with a constrained key space.



## Code Samples

```ts
const rocket = {
  name: 'Falcon 9',
  variant: 'Block 5',
  thrust: '7,607 kN',
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBATiYBrAprAvDA3gKBjMAQwFsUAuGAcgDFCAbUMGATkoBo8YA3QuAS0JgoFSgCE6iJDACs7TlAAWcAK7QRAdjYA2AAzqYSAHJyAvgG4cQA)

----

```ts
type Rocket = {[property: string]: string};
const rocket: Rocket = {
  name: 'Falcon 9',
  variant: 'v1.0',
  thrust: '4,940 kN',
};  // OK
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBASg9gYwNYWFAvFA3gbTAJzkn1AC4oBnYfASwDsBzAXXKtsYF8BuAKATjpUohZKnLxRaTFh5QodAIYBbCOQDkAMQUAbfnSgBONQBpZUAG4LaCusHXmAjADoADCbPAAFvgCuVdQAsxgYBLlBIAHLu3HIA9LFQAPIA0jxAA)

----

```ts
interface Rocket {
  name: string;
  variant: string;
  thrust_kN: number;
}
const falconHeavy: Rocket = {
  name: 'Falcon Heavy',
  variant: 'v1',
  thrust_kN: 15200,
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsEGsJmQbwChlkQ4BbCALmQGcwpQBzAbmOQDc5G5wb7GIVuzAALKAFd6AfSwA5GiAnkARtDYBfQgnQh6yeABsdIABIQ4HAJ40M2XMgC8BdmUo0A5ADE4x3cnNLKw8AGnYuHj5kDw4ARlCRcSkwWQVkWIBWACYABhywjTYgA)

----

```ts
function parseCSV(input: string): {[columnName: string]: string}[] {
  const lines = input.split('\n');
  const [headerLine, ...rows] = lines;
  const headers = headerLine.split(',');
  return rows.map(rowStr => {
    const row: {[columnName: string]: string} = {};
    rowStr.split(',').forEach((cell, i) => {
      row[headers[i]] = cell;
    });
    return row;
  });
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsEGsJmQbwChlkQ4BbCALmQGcwpQBzAbmOQDc5G5wb7GIVuzAALKAFd6AfSwA5GiAnkARtDYBfQgnQh6yeABsdIABIQ4HAJ40M2XMgC8BdmUo0A5ADE4x3cnNLKw8AGnYuHj5kDw4ARlCRcSkwWQVkWIBWACYABhywjTYYCRAEMGB-AAduWggAYQBlADUAClBKiTB+BmYAShp8AG0dQ2UQOQpqOh6hAF1uwSYNQdmXEhN9Q1AIWidkds6AOlpKrbAWjwAdEA9etnXdfUHRCwATaAAZbZDkQ7+odAAd1oq2cWxAO3uyA2eBecHeUF2zjhCK+EOOp2A51CtyhUFwEigIGQAOBh3IcEqLVJDQYTgAfGsSNDHnhSQNhuhRuRxpMFsx5tNFho9vhCuwSDSGBizhcQrdDjB0FAAKKIUQtFpIQyGH7AXoMpnMklA55vaC0QbAWag6EQHVQkgaO4SkkEokmwFQ52aQhAA)

----

```ts
interface ProductRow {
  productId: string;
  name: string;
  price: string;
}

declare let csvData: string;
const products = parseCSV(csvData) as unknown[] as ProductRow[];
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsEGsJmQbwChlkQ4BbCALmQGcwpQBzAbmOQDc5G5wb7GIVuzAALKAFd6AfSwA5GiAnkARtDYBfQgnQh6yeABsdIABIQ4HAJ40M2XMgC8BdmUo0A5ADE4x3cnNLKw8AGnYuHj5kDw4ARlCRcSkwWQVkWIBWACYABhywjTYYCRAEMGB-AAduWggAYQBlADUAClBKiTB+BmYAShp8AG0dQ2UQOQpqOh6hAF1uwSYNQdmXEhN9Q1AIWidkds6AOlpKrbAWjwAdEA9etnXdfUHRCwATaAAZbZDkQ7+odAAd1oq2cWxAO3uyA2eBecHeUF2zjhCK+EOOp2A51CtyhUFwEigIGQAOBh3IcEqLVJDQYTgAfGsSNDHnhSQNhuhRuRxpMFsx5tNFho9vhCuwSDSGBizhcQrdDjB0FAAKKIUQtFpIQyGH7AXoMpnMklA55vaC0QbAWag6EQHVQkgaO4SkkEokmwFQ52aQigSCwRAoAAKANeEjKGEBTMqYYjYAAkq9+UIoW4pgJmFDY8AkCnhFpCO8EIZuChDA4ELQOAAROBgOD5tgw5Cx9DhspI1s1erNLXVusNg1wXYlLAgIEgFbIEfIUPt+NRlZsIA)

----

```ts
function parseCSVMap(input: string): Map<string, string>[] {
  const lines = input.split('\n');
  const [headerLine, ...rows] = lines;
  const headers = headerLine.split(',');
  return rows.map(rowStr => {
    const row = new Map<string, string>();
    rowStr.split(',').forEach((cell, i) => {
      row.set(headers[i], cell);
    });
    return row;
  });
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsEGsJmQbwChlkQ4BbCALmQGcwpQBzAbmOQDc5G5wb7GIVuzAALKAFd6AfSwA5GiAnkARtDYBfQgnQh6yeABsdIABIQ4HAJ40M2XMgC8BdmUo0A5ADE4x3cnNLKw8AGnYuHj5kDw4ARlCRcSkwWQVkWIBWACYABhywjTYYCRAEMGB-AAduWggAYQBlADUAClBKiTB+BmYAShp8AG0dQ2UQOQpqOh6hAF1uwSYNQdmXEhN9Q1AIWidkds6AOlpKrbAWjwAdEA9etnXdfUHRCwATaAAZbZDkQ7+odAAd1oq2cWxAO3uyA2eBecHeUF2zjhCK+EOOp2A51CtyhUFwEigIGQAOBh3IcEqLVJDQYTgAfGsSNDHnhSQNhuhRuRxpMFsx5tNFho9vhCuwSDSGBizhcQrdDjB0FAAKKIUQtFpIQyGH7AXoMpnMklA55vaC0QbAWag6EQHVQkgaO4SkkEokmwFQ52aQigSCwRAoAAKANeEjKGEBTMqYYjYAAkq9+UIoW4pgJmFDY8AkCnhFpCO8EIZuChDA4ELQOAAROBgOD5tgw5Cx9DhspI1s1erNLXVusNg1wXYlLAgIEgFbIEfIUPt+NRlZFEplCrE6qI3tNACylLaIA6XSFfRoe8qAB5M0IftemPTp0QHno8OCdnsDmAZViLtdcewWzNeFPm+X5-iBEE9jfWgoRbFELT2eCoDRCBv2xeUXUld1iVJWhyX3KUoENJ9mRbUk9ghaNzyvGYmFvWj6RaTDmUItC5QVJVVXVTVtV1fYDUcRkSONUljlwFokMta0fl45inTkt0wEJHCgW9F0tCAA)

----

```ts
const rockets = parseCSVMap(csvData);
const superHeavy = rockets[2];
const thrust_kN = superHeavy.get('thrust_kN');  // 74,500
//    ^? const thrust_kN: string | undefined
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsEGsJmQbwChlkQ4BbCALmQGcwpQBzAbmOQDc5G5wb7GIVuzAALKAFd6AfSwA5GiAnkARtDYBfQgnQh6yeABsdIABIQ4HAJ40M2XMgC8BdmUo0A5ADE4x3cnNLKw8AGnYuHj5kDw4ARlCRcSkwWQVkWIBWACYABhywjTYYCRAEMGB-AAduWggAYQBlADUAClBKiTB+BmYAShp8AG0dQ2UQOQpqOh6hAF1uwSYNQdmXEhN9Q1AIWidkds6AOlpKrbAWjwAdEA9etnXdfUHRCwATaAAZbZDkQ7+odAAd1oq2cWxAO3uyA2eBecHeUF2zjhCK+EOOp2A51CtyhUFwEigIGQAOBh3IcEqLVJDQYTgAfGsSNDHnhSQNhuhRuRxpMFsx5tNFho9vhCuwSDSGBizhcQrdDjB0FAAKKIUQtFpIQyGH7AXoMpnMklA55vaC0QbAWag6EQHVQkgaO4SkkEokmwFQ52aQigSCwRAoAAKANeEjKGEBTMqYYjYAAkq9+UIoW4pgJmFDY8AkCnhFpCO8EIZuChDA4ELQOAAROBgOD5tgw5Cx9DhspI1s1erNLXVusNg1wXYlLAgIEgFbIEfIUPt+NRlZFEplCrE6qI3tNACylLaIA6XSFfRoe8qAB5M0IftemPTp0QHno8OCdnsDmAZViLtdcewWzNeFPm+X5-iBEE9jfWgoRbFELT2eCoDRCBv2xeUXUld1iVJWhyX3KUoENJ9mRbUk9ghaNzyvGYmFvWj6RaTDmUItC5QVJVVXVTVtV1fYDUcRkSONUljlwFokMta0fl45inTkt0wEJHCgW9F0tDIzAcDALtN1qRpd33Kta3rOAXRbWgJEqaBAmsPYAXsHTBiyWZm1ZZAxEkGR5D2SzrKgWyrEOJhxI8TzklSXESAAemi5AAHYABYQgyPJCFi40AD0AH4WRfDykm8tI72QAAfZASneGBtleQggA)

----

```ts
function parseRocket(map: Map<string, string>): Rocket {
  const name = map.get('name');
  const variant = map.get('variant');
  const thrust_kN = Number(map.get('thrust_kN'));
  if (!name || !variant || isNaN(thrust_kN)) {
    throw new Error(`Invalid rocket: ${map}`);
  }
  return {name, variant, thrust_kN};
}
const rockets = parseCSVMap(csvData).map(parseRocket);
//    ^? const rockets: Rocket[]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsEGsJmQbwChlkQ4BbCALmQGcwpQBzAbmOQDc5G5wb7GIVuzAALKAFd6AfSwA5GiAnkARtDYBfQgnQh6yeABsdIABIQ4HAJ40M2XMgC8BdmUo0A5ADE4x3cnNLKw8AGnYuHj5kDw4ARlCRcSkwWQVkWIBWACYABhywjTYYCRAEMGB-AAduWggAYQBlADUAClBKiTB+BmYAShp8AG0dQ2UQOQpqOh6hAF1uwSYNQdmXEhN9Q1AIWidkds6AOlpKrbAWjwAdEA9etnXdfUHRCwATaAAZbZDkQ7+odAAd1oq2cWxAO3uyA2eBecHeUF2zjhCK+EOOp2A51CtyhUFwEigIGQAOBh3IcEqLVJDQYTgAfGsSNDHnhSQNhuhRuRxpMFsx5tNFho9vhCuwSDSGBizhcQrdDjB0FAAKKIUQtFpIQyGH7AXoMpnMklA55vaC0QbAWag6EQHVQkgaO4SkkEokmwFQ52aQigSCwRAoAAKANeEjKGEBTMqYYjYAAkq9+UIoW4pgJmFDY8AkCnhFpCO8EIZuChDA4ELQOAAROBgOD5tgw5Cx9DhspI1s1erNLXVusNg1wXYlLAgIEgFbIEfIUPt+NRlZFEplCrE6qI3tNACylLaIA6XSFfRoe8qAB5M0IftemPTp0QHno8OCdnsDmAZViLtdcewWzNeFPm+X5-iBEE9jfWgoRbFELT2eCoDRCBv2xeUXUld1iVJWhyX3KUoENJ9mRbUk9ghaNzyvGYmFvWj6RaTDmUItC5QVJVVXVTVtV1fYDUcRkSONUljlwFokMta0fl45inTkt0wEJHCgW9F0tGKUpyiqHs7Bwc4KUqM9KRoxZ6MWel+jQTB9KZFt0z2QzDiYcSPHTf9n30CJgF4PBnCclzsW83yPJZF9kDESQZHkPY5GUNQoBaALXMi5JUluZjgBgZAWgAQgcgAfArkFy4LwGQIr9loCY5BaVLorkXoDWEiLxCBUgIGjFUoABRKAAMExALgtleE17GPAASfBDI0PrmK0LClI9fB0x+MqwB+eqUnkcUtDImzcC7TdakaXd9yrWt6zgXp8KpY6ID03AXQAeme40AD0AH4wv0AFxtoWwDrAFZCCAA)

----

```ts
interface Row1 { [column: string]: number }  // Too broad
interface Row2 { a: number; b?: number; c?: number; d?: number }  // Better
type Row3 =
    | { a: number; }
    | { a: number; b: number; }
    | { a: number; b: number; c: number;  }
    | { a: number; b: number; c: number; d: number };  // Also better
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsEGsJmQbwChlkQ4BbCALmQGcwpQBzAbmOQDc5G5wb7GIVuzAALKAFd6AfSwA5GiAnkARtDYBfQgnQh6yeABsdIABIQ4HAJ40M2XMgC8BdmUo0A5ADE4x3cnNLKw8AGnYuHj5kDw4ARlCRcSkwWQVkWIBWACYABhywjTYYCRAEMGB-AAduWggAYQBlADUAClBKiTB+BmYAShp8AG0dQ2UQOQpqOh6hAF1uwSYNQdmXEhN9Q1AIWidkds6AOlpKrbAWjwAdEA9etnXdfUHRCwATaAAZbZDkQ7+odAAd1oq2cWxAO3uyA2eBecHeUF2zjhCK+EOOp2A51CtyhUFwEigIGQAOBh3IcEqLVJDQYTgAfGsSNDHnhSQNhuhRuRxpMFsx5tNFho9vhCuwSDSGBizhcQrdDjB0FAAKKIUQtFpIQyGH7AXoMpnMklA55vaC0QbAWag6EQHVQkgaO4SkkEokmwFQ52aQigSCwRAoAAKANeEjKGEBTMqYYjYAAkq9+UIoW4pgJmFDY8AkCnhFpCO8EIZuChDA4ELQOAAROBgOD5tgw5Cx9DhspI1s1erNLXVusNg1wXYlLAgIEgFbIEfIUPt+NRlZFEplCrE6qI3tNACylLaIA6XSFfRoe8qAB5M0IftemPTp0QHno8OCdnsDmAZViLtdcewWzNeFPm+X5-iBEE9jfWgoRbFELT2eCoDRCBv2xeUXUld1iVJWhyX3KUoENJ9mRbUk9ghaNzyvGYmFvWj6RaTDmUItC5QVJVVXVTVtV1fYDUcRkSONUljlwFokMta0fl45inTkt0wEJHCgW9F0tH9aB4CQNAgViAhkE5bkQHzQUlFUaBkBFZAAHobOQAAVdB0GQFQAXhP1wC0oNdMBLIDMbUhlDUKAWFcgB+RRgvUaFIqCizQuQV44vMkKrJIOzkAAIVwANCDAKxKhQKMAGYnFdAAfAKooSsKtGNKr8BnGqQrClQWpi+rmUa5r4ta1yOsShBBrCqzKuqvqYvayahpGpLBqs0bMoAQUMWgXLUMA8qAA)

----

```ts
type Vec3D = Record<'x' | 'y' | 'z', number>;
//   ^? type Vec3D = {
//        x: number;
//        y: number;
//        z: number;
//      }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgEoHsEGsJmQbwChlkQ4BbCALmQGcwpQBzAbmOQDc5G5wb7GIVuzAALKAFd6AfSwA5GiAnkARtDYBfQgnQh6yeABsdIABIQ4HAJ40M2XMgC8BdmUo0A5ADE4x3cnNLKw8AGnYuHj5kDw4ARlCRcSkwWQVkWIBWACYABhywjTYYCRAEMGB-AAduWggAYQBlADUAClBKiTB+BmYAShp8AG0dQ2UQOQpqOh6hAF1uwSYNQdmXEhN9Q1AIWidkds6AOlpKrbAWjwAdEA9etnXdfUHRCwATaAAZbZDkQ7+odAAd1oq2cWxAO3uyA2eBecHeUF2zjhCK+EOOp2A51CtyhUFwEigIGQAOBh3IcEqLVJDQYTgAfGsSNDHnhSQNhuhRuRxpMFsx5tNFho9vhCuwSDSGBizhcQrdDjB0FAAKKIUQtFpIQyGH7AXoMpnMklA55vaC0QbAWag6EQHVQkgaO4SkkEokmwFQ52aQigSCwRAoAAKANeEjKGEBTMqYYjYAAkq9+UIoW4pgJmFDY8AkCnhFpCO8EIZuChDA4ELQOAAROBgOD5tgw5Cx9DhspI1s1erNLXVusNg1wXYlLAgIEgFbIEfIUPt+NRlZFEplCrE6qI3tNACylLaIA6XSFfRoe8qAB5M0IftemPTp0QHno8OCdnsDmAZViLtdcewWzNeFPm+X5-iBEE9jfWgoRbFELT2eCoDRCBv2xeUXUld1iVJWhyX3KUoENJ9mRbUk9ghaNzyvGYmFvWj6RaTDmUItC5QVJVVXVTVtV1fYDUcRkSONUljlwFokMta0fl45inTkt0wEJHCgW9F0tDAKxKhQJoIAQABmGs9lQPTlVeC8PAADw8ZAAB9omCOzogAL1CUhlDUKB6TYAB6HzmQAPQAfmQTTtOQXSDKM5wiD841jUsxQPPUQg4vikgbHc1QUrS9LnKS7KoF8-z4q0IA)

----

```ts
declare function renderAButton(props: ButtonProps): void;
interface ButtonProps {
  title: string;
  onClick: () => void;
}

renderAButton({
  title: 'Roll the dice',
  onClick: () => alert(1 + Math.floor(6 * Math.random())),
  theme: 'Solarized',
// ~~~~ Object literal may only specify known properties…
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXzlVBgEEAhZDDPACgAcYc6BnALngqrwAVGWBKdgDccWYAG4AUFlQYQMRFDAJO1VLybN4Ab0nx42DBBDtmGGDIDmU-XgDCELGADW7Gv3gBeAHzwRYqQBfSUlCYnJKNRpdfUNjdgByACUcCAgDAAsEYCcQBIAaPXh7Rxc3Dx94KGMYDBoARngAangAWSgMDIA6RAgcHBgaADZ4ACo2ju6YKCIcAFt3fn5C2Ky5k3gEgGVU2CwALxBgAskAelP4AD9ry-gAeQAjACtwDHhHOWn0uagAT2LUBB-sw6OAsIh-s5UDgAO74BhMeTYEDMQBkBJJAvwpEA)

----

```ts
interface ButtonProps {
  title: string;
  onClick: () => void;
  [otherProps: string]: unknown;
}

renderAButton({
  title: 'Roll the dice',
  onClick: () => alert(1 + Math.floor(20 * Math.random())),
  theme: 'Solarized',  // ok
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/CYUwxgNghgTiAEAzArgOzAFwJYHtXzlVBgEEAhZDDPACgAcYc6BnALngqrwAVGWBKdgDccWYAG4AUFlQYQMRFDAJO1VLybN4Ab0nx42DBBDtmGGDIDmU-XgDCELGADW7Gv3gBeAHzwRYm3gAbRwMAAt5DRZTcysAXXY0Z1QcAHdUKQBfSUlCYnJKNRpdfUNjdgByACUcCAgDCPhgJxAKgBo9eHtHFzcPH3goYxgMGgBGeABqeABZKHCAOkQIHBwYGgAmAAZ4ACpZ+bCFmCgiHABbd35+DtKI85N4CoBlWtgsAC8QYHb9AHo-l1nJJMvwpEA)
