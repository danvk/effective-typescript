declare function makeButton(props: {text: string, onClick: () => void }): void;
function addKeyListener(
  el: HTMLElement,
  fn: (this: HTMLElement, e: KeyboardEvent) => void
) {
  el.addEventListener('keydown', e => {
    fn(el, e);
        // ~ Expected 1 arguments, but got 2
  });
}
