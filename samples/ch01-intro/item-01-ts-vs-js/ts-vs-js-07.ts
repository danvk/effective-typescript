interface State {
  name: string;
  capital: string;
}
const states: State[] = [
  {name: 'Alabama', capitol: 'Montgomery'},
                 // ~~~~~~~~~~~~~~~~~~~~~
  {name: 'Alaska',  capitol: 'Juneau'},
                 // ~~~~~~~~~~~~~~~~~
  {name: 'Arizona', capitol: 'Phoenix'},
                 // ~~~~~~~~~~~~~~~~~~ Object literal may only specify known
                 //         properties, but 'capitol' does not exist in type
                 //         'State'.  Did you mean to write 'capital'?
  // ...
];
for (const state of states) {
  console.log(state.capital);
}
