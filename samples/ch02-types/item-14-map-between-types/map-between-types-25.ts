interface Name {
  first: string;
  last: string;
}
type DancingDuo<T extends Name> = [T, T];
const dancingDuo = <T extends Name>(x: DancingDuo<T>) => x;
const couple1 = dancingDuo([
  {first: 'Fred', last: 'Astaire'},
  {first: 'Ginger', last: 'Rogers'}
]);
const couple2 = dancingDuo([
  {first: 'Bono'},
// ~~~~~~~~~~~~~~
  {first: 'Prince'}
// ~~~~~~~~~~~~~~~~
//     Property 'last' is missing in type
//     '{ first: string; }' but required in type 'Name'
]);
