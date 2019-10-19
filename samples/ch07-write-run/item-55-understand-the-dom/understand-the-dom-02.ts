function handleDrag(eDown: Event) {
  const targetEl = eDown.currentTarget;
  targetEl.classList.add('dragging');
// ~~~~~~~           Object is possibly 'null'
//         ~~~~~~~~~ Property 'classList' does not exist on type 'EventTarget'
  // ...
}
