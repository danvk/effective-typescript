type TState = {
  name: string;
  capital: string;
}
interface IState {
  name: string;
  capital: string;
}
interface IStateWithPop extends TState {
  population: number;
}
type TStateWithPop = IState & { population: number; };
