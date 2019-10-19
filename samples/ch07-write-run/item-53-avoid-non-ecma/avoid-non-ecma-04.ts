type Flavor = 'vanilla' | 'chocolate' | 'strawberry';

let flavor: Flavor = 'chocolate';  // OK
    flavor = 'mint chip';
 // ~~~~~~ Type '"mint chip"' is not assignable to type 'Flavor'
