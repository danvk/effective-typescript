const states = [
  {name: 'Alabama', capitol: 'Montgomery'},
  {name: 'Alaska',  capitol: 'Juneau'},
  {name: 'Arizona', capitol: 'Phoenix'},
  // ...
];
for (const state of states) {
  console.log(state.capital);
                 // ~~~~~~~ Property 'capital' does not exist on type
                 //         '{ name: string; capitol: string; }'.
                 //         Did you mean 'capitol'?
}
