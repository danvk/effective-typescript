# Item 34: Prefer Unions of Interfaces to Interfaces with Unions

## Things to Remember

- Interfaces with multiple properties that are union types are often a mistake because they obscure the relationships between these properties.
- Unions of interfaces are more precise and can be understood by TypeScript.
- Use tagged unions to facilitate control flow analysis. Because they are so well supported, this pattern is ubiquitous in TypeScript code.
- Consider whether multiple optional properties could be grouped to more accurately model your data.

## Code Samples

```ts
interface Layer {
  layout: FillLayout | LineLayout | PointLayout;
  paint: FillPaint | LinePaint | PointPaint;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEBUAsFMGdtAO2tAJqALge1AIwQJaIDGWAtgA4CGGBuANggGSimWMAeo0iWArgHNImHLwygB0cUXpE0oItwBOSrEtBk4sKpNgA6AFAYAnhQQAxAvXoAFKkXEBeUAG9L1uw4BcoAOS+AXwBuI1MEABk5T0QnV0jkaIwff2DQs1AbLAdE0GcXTOz7GOTAkJN093pwqmN+WLcrKpq6ktTyiLlq2r56+Ogulr9StIQCmIGe3NcxjAmkodSHaCUAMypiCJrl1wNQUHpmnp9KudAAH1A+04uZuZC96m9QSpyLvteMrJjEkICDIA)

----

```ts
interface FillLayer {
  layout: FillLayout;
  paint: FillPaint;
}
interface LineLayer {
  layout: LineLayout;
  paint: LinePaint;
}
interface PointLayer {
  layout: PointLayout;
  paint: PointPaint;
}
type Layer = FillLayer | LineLayer | PointLayer;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEBUAsFMGdtAO2tAJqALge1AIwQJaIDGWAtgA4CGGBuANggGSimWMAeo0iWArgHNImHLwygB0cUXpE0oItwBOSrEtBk4sKpNgA6AFAYAnhQQAxAvXoAFKkXEBeUAG9L1uw4BcoAOS+AXwBuI1MEABk5T0QnV0jkaIwff2DQs1AbLAdE0GcXTOz7GOTAkJN093pwqmN+WLcrKpq6ktTyiLlq2r56+Ogulr9StIQCmIGe3NcxjAmkodSHaCUAMypiC0au5dcDUFB6Zp6fSrmQ-epvUErEkICDJdX1juRt9Rc9g6P5vrPPy+KoD6twM90eaw2GSy4xqOw++0O3XmMz+FyKyOhGBB93aQNh6mcp3xoAAPkDOsSySj8SEgA)

----

```ts
interface Layer {
  type: 'fill' | 'line' | 'point';
  layout: FillLayout | LineLayout | PointLayout;
  paint: FillPaint | LinePaint | PointPaint;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEBUAsFMGdtAO2tAJqALge1AIwQJaIDGWAtgA4CGGBuANggGSimWMAeo0iWArgHNImHLwygB0cUXpE0oItwBOSrEtBk4sKpNgA6AFAYAnhQQAxAvXoAFKkXEBeUAG9L1uw4BcoAOS+AXwBuI1MEABk5T0QnV0jkaIwff2DQs1AbLAdE0GcXTOz7GOTAkJN093pwqmN+WLcrKpq6ktTyiLlq2r56+Ogulr9StIQCmIGe3NcxjAmkodSHaCUAMypiCJrl1wNQTDDklcbfUAAfP1lkE-PfCiyY3xC9+maen0q5s9A+z-OZuaeoGo3lAlRy5z64Iy9wwiRCAQMQA)

----

```ts
interface FillLayer {
  type: 'fill';
  layout: FillLayout;
  paint: FillPaint;
}
interface LineLayer {
  type: 'line';
  layout: LineLayout;
  paint: LinePaint;
}
interface PointLayer {
  type: 'paint';
  layout: PointLayout;
  paint: PointPaint;
}
type Layer = FillLayer | LineLayer | PointLayer;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEBUAsFMGdtAO2tAJqALge1AIwQJaIDGWAtgA4CGGBuANggGSimWMAeo0iWArgHNImHLwygB0cUXpE0oItwBOSrEtBk4sKpNgA6AFAYAnhQQAxAvXoAFKkXEBeUAG9L1uw4BcoAOS+AXwBuI1MEABk5T0QnV0jkaIwff2DQs1AbLAdE0GcXTOz7GOTAkJN093pwqmN+WLcrKpq6ktTyiLlq2r56+Ogulr9StIQCmIGe3NcxjAmkodSHaCUAMypiC0au5dcDUEww5JXG3xD9+maen0q5s9Bqb1BKxJCAgyXV9Y7kbfUXPYOZmSsmQpwBF268z6twBD2KoD6LwMbw+aw2GSy4xqO3++3ayThGDB50u8xmMP2hJ8MyRb3aCOx6mcN0ZoAAPgjOqyOeTGSEgA)

----

```ts
function drawLayer(layer: Layer) {
  if (layer.type === 'fill') {
    const {paint} = layer;
    //     ^? const paint: FillPaint
    const {layout} = layer;
    //     ^? const layout: FillLayout
  } else if (layer.type === 'line') {
    const {paint} = layer;
    //     ^? const paint: LinePaint
    const {layout} = layer;
    //     ^? const layout: LineLayout
  } else {
    const {paint} = layer;
    //     ^? const paint: PointPaint
    const {layout} = layer;
    //     ^? const layout: PointLayout
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/PTAEBUAsFMGdtAO2tAJqALge1AIwQJaIDGWAtgA4CGGBuANggGSimWMAeo0iWArgHNImHLwygB0cUXpE0oItwBOSrEtBk4sKpNgA6AFAYAnhQQAxAvXoAFKkXEBeUAG9L1uw4BcoAOS+AXwBuI1MEABk5T0QnV0jkaIwff2DQs1AbLAdE0GcXTOz7GOTAkJN093pwqmN+WLcrKpq6ktTyiLlq2r56+Ogulr9StIQCmIGe3NcxjAmkodSHaCUAMypiC0au5dcDUEww5JXG3xD9+maen0q5s9Bqb1BKxJCAgyXV9Y7kbfUXPYOZmSsmQpwBF268z6twBD2KoD6LwMbw+aw2GSy4xqO3++3ayThGDB50u8xmMP2hJ8MyRb3aCOx6mcN0ZoAAPgjOqyOeTGSEVnwSLQsIhQKglFQAO6-AAUEOWPl+AEpdvsCCtQHLGXp6Y49X5jtZfCrcftWCLYOIXISAlN5Uo7vsQGb9gA9AD85sQlvuRXmzz9AP2pG9VohdVtzntjtAzpdHq9PvDVyeW1JANt0Ho8AUGq1xmWOrCuX1vhB0GNqrNIZ91r9kdA0aDsbA8c9NfEVM5CUDLo7rmTGAbTZdcbNCf7g8VXMhGe42YQpuDFqtNrtfObY7d7ZXvseNN71d3LkHw43o9b453ocbpOpmNm6f2bzeQA)

----

```ts
interface Person {
  name: string;
  // These will either both be present or not be present
  placeOfBirth?: string;
  dateOfBirth?: Date;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyIcAthAFzIZhSgDmA3EcgPRvIAqAFhBigDuwADYjkEYGD5RkAIyzT5KAA5R+EcMiyyQi5cjUbwrFSMQQA8jABCwKNID81WvRDNWAEziRrdhzzOyAAiPhAsAL4EQA)

----

```ts
interface Person {
  name: string;
  birth?: {
    place: string;
    date: Date;
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyIcAthAFzIZhSgDmA3EcgEbBRgAWA-NYWLEADgBtEVGnUYshyACZxI1ACJKIs5AF8COoA)

----

```ts
const alanT: Person = {
  name: 'Alan Turing',
  birth: {
// ~~~~ Property 'date' is missing in type
//      '{ place: string; }' but required in type
//      '{ place: string; date: Date; }'
    place: 'London'
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyIcAthAFzIZhSgDmA3EcgEbBRgAWA-NYWLEADgBtEVGnUYshyACZxI1ACJKIs5AF8COhDlrI44kABVq6KNlwBefK1IVqAcgCCJ5KYCu9EA2cANKwcXNwCBAD0EcgAfnExaFBYwtBgAJ7IzoqQzsjAGMhk+RiMebjpKZHRcpl4yGIS1LS+zNq5bF5gyFAQAI5enBDyZcgVEFU1tfXiSE3SfkwK6qrqi1rOrCIzks4AMjjyOBvEOjpAA)

----

```ts
function eulogize(person: Person) {
  console.log(person.name);
  const {birth} = person;
  if (birth) {
    console.log(`was born on ${birth.date} in ${birth.place}.`);
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyyIcAthAFzIZhSgDmA3EcgEbBRgAWA-NYWLEADgBtEVGnUYshyACZxI1ACJKIs5AF8COmAFcQCMMBzII+0VgbAAXhAAUwzDmroo2EAEp8rBDmxRCAA6KwYnFxBg0govTX8QWnwOLm4tZABeZGcPHE1gGGQHFJ4fQSEEwJCwhwADAHc4DHYsKFwzABI8Eu5gxUh00GQunuCxCS1g2rjWHR0gA)

----

```ts
interface Name {
  name: string;
}

interface PersonWithBirth extends Name {
  placeOfBirth: string;
  dateOfBirth: Date;
}

type Person = Name | PersonWithBirth;
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgHJwLYoN4ChnIiYQBcyAzmFKAOYDcuAvrrqJLIigArTkD2IAOrAwACwBCwKGOQQAHpBAATcmmLI8BAA4AbTgHkYk6aLKVqIevmRK4kQ8bFkAInYgNmuMAE8t3XgLIALxqWMgAPsg8UPxCIhJSYgxAA)

----

```ts
function eulogize(person: Person) {
  if ('placeOfBirth' in person) {
    person
    // ^? (parameter) person: PersonWithBirth
    const {dateOfBirth} = person;  // OK
    //     ^? const dateOfBirth: Date
  }
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgHJwLYoN4ChnIiYQBcyAzmFKAOYDcuAvrrqJLIigArTkD2IAOrAwACwBCwKGOQQAHpBAATcmmLI8BAA4AbTgHkYk6aLKVqIevmRK4kQ8bFkAInYgNmuMAE8t3XgLIALxqWMgAPsg8UPxCIhJSYgwwAK4gCGDAgRApOnw0wABeEAAUfjECZNGxAJQa1sAwyCUA5LoGRomiLcigyOW19QTaASDWBAD0E8gAegD8zVpwUMTsdQOVUaPCYo6i48gIApQatvadJozB-aN0k9P6ANIHU8ME84fHYDZuDl0ubmszGYQA)
