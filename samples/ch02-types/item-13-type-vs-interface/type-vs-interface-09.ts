type TState = {
  name: string;
  capital: string;
}
interface IState {
  name: string;
  capital: string;
}
class StateT implements TState {
  name: string = '';
  capital: string = '';
}
class StateI implements IState {
  name: string = '';
  capital: string = '';
}
