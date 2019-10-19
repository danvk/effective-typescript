function addCounter(el: HTMLElement) {
  let clickCount = 0;
  const button = document.createElement('button');
  button.textContent = 'Click me';
  button.addEventListener('click', () => {
    clickCount++;
    button.textContent = `Click me (${clickCount})`;
  });
  el.appendChild(button);
}

addCounter(document.body);
