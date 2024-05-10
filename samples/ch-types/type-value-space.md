# Item 8: Know How to Tell Whether a Symbol Is in the Type Space or Value Space

## Things to Remember

- Know how to tell whether you're in type space or value space while reading a TypeScript expression. Use the TypeScript playground to build an intuition for this.
- Every value has a static type, but this is only accessible in type space. Type space constructs such as `type` and `interface` are erased and are not accessible in value space.
- Some constructs, such as `class` or `enum`, introduce both a type and a value.
- `typeof`, `this`, and many other operators and keywords have different meanings in type space and value space.


## Code Samples

```ts
interface Cylinder {
  radius: number;
  height: number;
}

const Cylinder = (radius: number, height: number) => ({radius, height});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIE8A2oAm1kDeAUMslHDsAK4DOAXMiFQLYBG0A3CcgBYTABzHmAZM2nIgF8iRBAHsQNMGiy58AXmQAKcpVqiW7KABpe-ISMaHoASmTqAfNoK7qNU30HDJNrkA)

----

```ts
function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    shape.radius
    //    ~~~~~~ Property 'radius' does not exist on type '{}'
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgMIE8A2oAm1kDeAUMslHDsAK4DOAXMiFQLYBG0A3CcgBYTABzHmAZM2nIgF8iRBAHsQNMGiy58AXmQAKcpVqiW7KABpe-ISMaHoASmTqAfNoK7qNU30HDJNrjCogCGDACsgIcJgIVJhwkABqcpgsEFo0PHAADhAMAQDWIHIA7iB2xKTAMNppmSigSnCBEHKVGNggeFCl3KTVWQB0rrTdyAD0I6SkAH7TM8gAClByWVBg6MgA5IM068g4chA0jHLKEAAewErIoatZGwSS69zS0kA)

----

```ts
type T1 = 'string literal';
const v1 = 'string literal';
type T2 = 123;
const v2 = 123;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAKgjFAvFA5AZ2AJwJYDsDmUANtsBJgIZEoDcAUAMYD2uGUAbgsulnoSWUrV6oSLABMSKHHEBmes1bAOk5DPl0gA)

----

```ts
interface Person {
  first: string;
  last: string;
}
const jane: Person = { first: 'Jane', last: 'Jacobs' };
//    ――――           ――――――――――――――――――――――――――――――――― Values
//          ―――――― Type
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAXMhVKAOYDcRyANnBdbQ8wL4EIcFZACs4ICNXTkcyALz4SZTsgDkAKXERVAGjYcqazYIBGGVcl7MA9NeLFAqAROH916+cfPX7z+QA1OFYAVwgMAls3Ny9kABUATwAHCAIgA)

----

```ts
function email(to: Person, subject: string, body: string): Response {
  //     ――――― ――          ―――――――          ――――                    Values
  //               ――――――           ――――――        ――――――   ―――――――― Types
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAXMhVKAOYDcRyANnBdbQ8wL4EIcFZACs4ICNXTkcyALz4SZTsgDkAKXERVAGjYcqazYIBGGVcl7MA9NeLFAqAROH916+cfPX7z+QA1OFYAVwgMAls3Ny9kABUATwAHCAIYIJAEMGBZCABbOGBWAAowLClMHD0MIJMRCAyuMDoQej0TLAATOIam+gBKagAlUIShFEJiCPcPZCdIqc85+2nFleIA4NCWSdWlhdXouYOZ71jEzYm7AGEAeQBZVAGAUQBlZ5YoCDAgqFwJAHdkEMMCMQBgIIVeswLshHgA5AAiBH4BCAA)

----

```ts
class Cylinder {
  radius: number;
  height: number;
  constructor(radius: number, height: number) {
    this.radius = radius;
    this.height = height;
  }
}

function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    shape
    // ^? (parameter) shape: Cylinder
    shape.radius
    //    ^? (property) Cylinder.radius: number
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAXMhVKAOYDcRyANnBdbQ8wL4EIcFZACs4ICNXTkcyALz4SZTsgDkAKXERVAGjYcqazYIBGGVcl7MA9NeLFAqAROH916+cfPX7z+QA1OFYAVwgMAls3Ny9kABUATwAHCAIYIJAEMGBZCABbOGBWAAowLClMHD0MIJMRCAyuMDoQej0TLAATOIam+gBKagAlUIShFEJiCPcPZCdIqc85+2nFleIA4NCWSdWlhdXouYOZ71jEzYm7AGEAeQBZVAGAUQBlZ5YoCDAgqFwJAHdkEMMCMQBgIIVeswLshHgA5AAiBH4AnYGAwyEucVYoHa0Hw7zg7WAQQw1BAQRyJmgUOQAAsIMB6LTDOTKdSWIJQY0ghksFBClBCcTSchWVSoHp6YzmWSKeLevjXGBacAMAA6QVEknyZCa4U04jK1VqqVMsA603Mmn8ZGpdKZWQIQIIILsSB+LDBHLgjC0uBJahpADWICwfxACvGyGAMGQhV9-pQoAo4iQWFjmOxIFxUEjLGICaS+eQEQAegB+OMJOCC72QXM0P0BjFYnHQYuFiAaoUk4vbZAVqtQLBJKBgOIKzNtqDdrUisXt4g2ghAA)

----

```ts
type T1 = typeof jane;
//   ^? type T1 = Person
type T2 = typeof email;
//   ^? type T2 = (to: Person, subject: string, body: string) => Response

const v1 = typeof jane;  // Value is "object"
const v2 = typeof email;  // Value is "function"
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAXMhVKAOYDcRyANnBdbQ8wL4EIcFZACs4ICNXTkcyALz4SZTsgDkAKXERVAGjYcqazYIBGGVcl7MA9NeLFAqAROH916+cfPX7z+QA1OFYAVwgMAls3Ny9kABUATwAHCAIYIJAEMGBZCABbOGBWAAowLClMHD0MIJMRCAyuMDoQej0TLAATOIam+gBKagAlUIShFEJiCPcPZCdIqc85+2nFleIA4NCWSdWlhdXouYOZ71jEzYm7AGEAeQBZVAGAUQBlZ5YoCDAgqFwJAHdkEMMCMQBgIIVeswLshHgA5AAiBH4AnYGAwyEucVYoHa0Hw7zg7WAQQw1BAQRyJmgUOQAAsIMB6LTDOTKdSWIJQY0ghksFBClBCcTSchWVSoHp6YzmWSKeLevjXGBacAMAA6QVEknyZCa4U04jK1VqqVMsA603Mmn8ZGpdKZWQIQIIILsSB+LDBHLgjC0uBJahpADWICwfxACvGyGAMGQhV9-pQoAo4iQWFjmOxIFxUEjLGICaS+eQEQAegB+OMJOCC72QXM0P0BjFYnHQYuFiAaoUk4vbZAVqtQLBJKBgOIKzNtqDdrUisXt4g2gjjpKxACMOtXEHToi0NjsxEH243Ouk2BAK7OsQATFuzrvcvlWAf7MfrzE7wpiqU0OUQJU1S1PUNCNAwrQdF0oE9AqcgAHyAsMowEAIQjmgAbpuCjbruYgSIw0LrCE0bogARFgNR1GApGoVyyDoV+yA4bGT4FARJZ2ERSZkXaGRZCANFAA)

----

```ts
const first: Person['first'] = jane['first'];  // Or jane.first
//    ―――――                    ――――――――――――― Values
//           ―――――― ―――――――                  Types
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAXMhVKAOYDcRyANnBdbQ8wL4EIcFZACs4ICNXTkcyALz4SZTsgDkAKXERVAGjYcqazYIBGGVcl7MA9NeLFAqAROH916+cfPX7z+QA1OFYAVwgMAls3Ny9kABUATwAHCAIYIJAEMGBZCABbOGBWAAowLClMHD0MIJMRCAyuMDoQej0TLAATOIam+gBKagAlUIShFEJiCPcPZCdIqc85+2nFleIA4NCWSdWlhdXouYOZ71jEzYm7AGEAeQBZVAGAUQBlZ5YoCDAgqFwJAHdkEMMCMQBgIIVeswLshHgA5AAiBH4AnYGAwyEucVYoHa0Hw7zg7WAQQw1BAQRyJmgUOQAAsIMB6LTDOTKdSWIJQY0ghksFBClBCcTSchWVSoHp6YzmWSKeLevjXGBacAMAA6QVEknyZCa4U04jK1VqqVMsA603Mmn8ZGpdKZWQIQIIILsSB+LDBHLgjC0uBJahpADWICwfxACvGyGAMGQhV9-pQoAo4iQWFjmOxIFxUEjLGICaS+eQEQAegB+OMJOCC72QXM0P0BjFYnHQYuFiAaoUk4vbZAVqtQLBJKBgOIKzNtqDdrUisXt4g2gRCc2kciGaTYEAAbVU64oqgAujqxBI9wewMfGNDrlBRFo1ZfwnZds4disfAt1iEwv3DgsJwfm48RJGEQA)

----

```ts
type PersonEl = Person['first' | 'last'];
//   ^? type PersonEl = string
type Tuple = [string, number, Date];
type TupleEl = Tuple[number];
//   ^? type TupleEl = string | number | Date
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAXMhVKAOYDcRyANnBdbQ8wL4EIcFZACs4ICNXTkcyALz4SZTsgDkAKXERVAGjYcqazYIBGGVcl7MA9NeLFAqAROH916+cfPX7z+QA1OFYAVwgMAls3Ny9kABUATwAHCAIYIJAEMGBZCABbOGBWAAowLClMHD0MIJMRCAyuMDoQej0TLAATOIam+gBKagAlUIShFEJiCPcPZCdIqc85+2nFleIA4NCWSdWlhdXouYOZ71jEzYm7AGEAeQBZVAGAUQBlZ5YoCDAgqFwJAHdkEMMCMQBgIIVeswLshHgA5AAiBH4AnYGAwyEucVYoHa0Hw7zg7WAQQw1BAQRyJmgUOQAAsIMB6LTDOTKdSWIJQY0ghksFBClBCcTSchWVSoHp6YzmWSKeLevjXGBacAMAA6QVEknyZCa4U04jK1VqqVMsA603Mmn8ZGpdKZWQIQIIILsSB+LDBHLgjC0uBJahpADWICwfxACvGyGAMGQhV9-pQoAo4iQWFjmOxIFxUEjLGICaS+eQEQAegB+OMJOCC72QXM0P0BjFYnHQYuFiAaoUk4vbZAVqtQLBJKBgOIKzNtqDdrUisXt4g2gjjpJocogR6sHXSbAgADaqlI5DAFgAPmpUaeALo2OzEQerlC7nBbnXcZors6xIIJVgoBR9w-FpRTlaA9HhOBIFvL81xiX9-zfBR4L-CB9wXKAYO2R9vxQxDtwUYDkAvDDiOQSDIAIIA)

----

```ts
function email(options: {to: Person, subject: string, body: string}) {
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAXMhVKAOYDcRyANnBdbQ8wL4EwAriARhgOZBAC2cYKwAUWAA5icGanjBZq6cjgA0NQQCMAVhFFcwdEPUPGsAEwCeVm-V4BKfCwD0v5AA6YIJ+IA)

----

```ts
function email({
  to: Person,
  //  ~~~~~~ Binding element 'Person' implicitly has an 'any' type
  subject: string,
  //       ~~~~~~ Binding element 'string' implicitly has an 'any' type
  body: string
  //    ~~~~~~ Binding element 'string' implicitly has an 'any' type
}) { /* ... */ }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAXMhVKAOYDcRyANnBdbQ8wL4EwAriARhgOZBAC2cYKwAUhYmCzV05HABoWAeh3EAfkePIAQqAAmDSa2kRwyAOTrsIR8mBSADq2AJgYKwAnsgAFhzIcLiOUUHuYEFeECwYggBGAFYQolxgdCD02sR6xKWGxkZmltYQtlL2YE7cBe6ePn4BwWERUU6x8YnJxGlYFkG5+fS6+qUVleYgVgU2dg6OzfSt3r7+gSHhGJHR-cgJSQS8AJT4yDoAVMgAdM-Id-r8QA)

----

```ts
function email(
  {to, subject, body}: {to: Person, subject: string, body: string}
) {
  // ...
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyMwUGYAXMhVKAOYDcRyANnBdbQ8wL4EwAriARhgOZBAC2cYKwAULPGCwAaGoIBGAKwij1mrABMAnr2rKs1dORzqMW3aK5g6IegeMmXb+vwCU+CwA9MHIAHSRBPxAA)
