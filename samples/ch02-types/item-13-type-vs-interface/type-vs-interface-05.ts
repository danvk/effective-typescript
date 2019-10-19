type TState = {
  name: string;
  capital: string;
}
interface IState {
  name: string;
  capital: string;
}
type TFn = (x: number) => string;
interface IFn {
  (x: number): string;
}

const toStrT: TFn = x => '' + x;  // OK
const toStrI: IFn = x => '' + x;  // OK
