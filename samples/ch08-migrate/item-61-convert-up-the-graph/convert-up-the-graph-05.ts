// tsConfig: {"noImplicitAny":false,"strictNullChecks":false}

interface State {
  name: string;
  capital: string;
}
const state = {} as State;
state.name = 'New York';  // OK
state.capital = 'Albany';  // OK
