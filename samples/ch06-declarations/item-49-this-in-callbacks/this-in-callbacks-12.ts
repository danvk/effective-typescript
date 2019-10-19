declare function makeButton(props: {text: string, onClick: () => void }): void;
function addKeyListener(
  el: HTMLElement,
  fn: (this: HTMLElement, e: KeyboardEvent) => void
) {
  el.addEventListener('keydown', e => {
    fn(e);
 // ~~~~~ The 'this' context of type 'void' is not assignable
 //       to method's 'this' of type 'HTMLElement'
  });
}
declare let el: HTMLElement;
addKeyListener(el, function(e) {
  this.innerHTML;  // OK, "this" has type of HTMLElement
});
