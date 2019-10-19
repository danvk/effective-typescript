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
class Foo {
  registerHandler(el: HTMLElement) {
    addKeyListener(el, e => {
      this.innerHTML;
        // ~~~~~~~~~ Property 'innerHTML' does not exist on type 'Foo'
    });
  }
}
