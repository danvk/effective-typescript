function handleDrag(eDown: Event) {
  const targetEl = eDown.currentTarget;
  targetEl.classList.add('dragging');
// ~~~~~~~           Object is possibly 'null'.
//         ~~~~~~~~~ Property 'classList' does not exist on type 'EventTarget'
  const dragStart = [
     eDown.clientX, eDown.clientY];
        // ~~~~~~~                Property 'clientX' does not exist on 'Event'
        //                ~~~~~~~ Property 'clientY' does not exist on 'Event'
  const handleUp = (eUp: Event) => {
    targetEl.classList.remove('dragging');
//  ~~~~~~~~           Object is possibly 'null'.
//           ~~~~~~~~~ Property 'classList' does not exist on type 'EventTarget'
    targetEl.removeEventListener('mouseup', handleUp);
//  ~~~~~~~~ Object is possibly 'null'
    const dragEnd = [
       eUp.clientX, eUp.clientY];
        // ~~~~~~~                Property 'clientX' does not exist on 'Event'
        //              ~~~~~~~   Property 'clientY' does not exist on 'Event'
    console.log('dx, dy = ', [0, 1].map(i => dragEnd[i] - dragStart[i]));
  }
  targetEl.addEventListener('mouseup', handleUp);
// ~~~~~~~ Object is possibly 'null'
}

   const div = document.getElementById('surface');
   div.addEventListener('mousedown', handleDrag);
// ~~~ Object is possibly 'null'
