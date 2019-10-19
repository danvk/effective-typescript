type TState = {
  name: string;
  capital: string;
}
interface IState {
  name: string;
  capital: string;
}
const wyoming: TState = {
  name: 'Wyoming',
  capital: 'Cheyenne',
  population: 500_000
// ~~~~~~~~~~~~~~~~~~ Type ... is not assignable to type 'TState'
//                    Object literal may only specify known properties, and
//                    'population' does not exist in type 'TState'
};
