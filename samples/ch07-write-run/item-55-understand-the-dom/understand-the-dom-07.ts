function handleDrag(eDown: Event) {
  // ...
  const dragStart = [
     eDown.clientX, eDown.clientY];
        // ~~~~~~~                Property 'clientX' does not exist on 'Event'
        //                ~~~~~~~ Property 'clientY' does not exist on 'Event'
  // ...
}
