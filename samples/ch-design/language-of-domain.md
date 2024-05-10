# Item 41: Name Types Using the Language of Your Problem Domain

## Things to Remember

- Reuse names from the domain of your problem where possible to increase the readability and level of abstraction of your code. Make sure you use domain terms accurately.
- Avoid using different names for the same thing: make distinctions in names meaningful.
- Avoid vague names like "Info" or "Entity." Name types for what they are, rather than for their shape.

## Code Samples

```ts
interface Animal {
  name: string;
  endangered: boolean;
  habitat: string;
}

const leopard: Animal = {
  name: 'Snow Leopard',
  endangered: false,
  habitat: 'tundra',
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgIImAWzgG2QbwChlkQ5MIAuZAZzClAHMBuY5CEAEzhEegk7UARgHsROCD1YkAFnCHAwcMNToNerAL6FCCESDrIJIgA5wogtBmx4AvATZkK1AOQBlECIDuyADIRTc04XABo2Dm5efkt4HBoIMNl5RWVXMABXLig4UMJNViA)

----

```ts
interface Animal {
  commonName: string;
  genus: string;
  species: string;
  status: ConservationStatus;
  climates: KoppenClimate[];
}
type ConservationStatus = 'EX' | 'EW' | 'CR' | 'EN' | 'VU' | 'NT' | 'LC';
type KoppenClimate = |
  'Af' | 'Am' | 'As' | 'Aw' |
  'BSh' | 'BSk' | 'BWh' | 'BWk' |
  'Cfa' | 'Cfb' | 'Cfc' | 'Csa' | 'Csb' | 'Csc' | 'Cwa' | 'Cwb' | 'Cwc' |
  'Dfa' | 'Dfb' | 'Dfc' | 'Dfd' |
  'Dsa' | 'Dsb' | 'Dsc' | 'Dwa' | 'Dwb' | 'Dwc' | 'Dwd' |
  'EF' | 'ET';
const snowLeopard: Animal = {
  commonName: 'Snow Leopard',
  genus: 'Panthera',
  species: 'Uncia',
  status: 'VU',  // vulnerable
  climates: ['ET', 'EF', 'Dfd'],  // alpine or subalpine
};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgIImAWzgG2QbwChlkEB7TTMkAOTkwgC5kBnMKUAcwG5jlOIIAK4tmbDiB58WABwgJgEUa3ZdeJNnDAjmAYWotoANy3BqAZTBaR60jixalzANJkZckLvvZIAbQC6vAC+hGAAnnLI+iCGUCZgZiCW1izIALzIAOQAogAamcgAPlnZAOoFxZm6AEoVJTR1mQBqAKqNNAAqjQAyupm84ZGu7oJeDpDpRXyZqDCNqJjzLPMA7hXTAELmABaNWwDWe6W7RVkbpYdTJFXwjbowAEZ3MAh3LHBvT6dVLK-fuisPv8Vl9KgC-oVpgARW7fGGgrIwiGImAAE3W1yh70aWIRmSxyPxgJxIJJhKhK3RVxKADFGtkurxyDEwKwQGQVt0IG44FBUcx0A48BkiCRyJRqHQGMxMuZ2StkFyeXzMgAaPgCYTKTIABTg4G20A+6o0cgUTiyLRACmN0is2m1rTVJAA9C7kEYhDgQEaHjgIHwEN5HMpfDkuqrac78WjMv5I8g3chcDJQCgyFBWEIHim04QgrwgA)
