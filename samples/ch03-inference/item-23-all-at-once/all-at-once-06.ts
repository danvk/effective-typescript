interface Point { x: number; y: number; }
const pt = {x: 3, y: 4};
const id = {name: 'Pythagoras'};
const namedPoint = {};
Object.assign(namedPoint, pt, id);
namedPoint.name;
        // ~~~~ Property 'name' does not exist on type '{}'
