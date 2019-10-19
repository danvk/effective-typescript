enum Flavor {
  VANILLA = 'vanilla',
  CHOCOLATE = 'chocolate',
  STRAWBERRY = 'strawberry',
}

let flavor = Flavor.CHOCOLATE;  // Type is Flavor
    flavor = 'strawberry';
 // ~~~~~~ Type '"strawberry"' is not assignable to type 'Flavor'
function scoop(flavor: Flavor) { /* ... */ }
