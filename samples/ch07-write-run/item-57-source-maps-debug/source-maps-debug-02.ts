function addCounter(el: HTMLElement) {
  let clickCount = 0;
  const triviaEl = document.createElement('p');
  const button = document.createElement('button');
  button.textContent = 'Click me';
  button.addEventListener('click', async () => {
    clickCount++;
    const response = await fetch(`http://numbersapi.com/${clickCount}`);
    const trivia = await response.text();
    triviaEl.textContent = trivia;
    button.textContent = `Click me (${clickCount})`;
  });
  el.appendChild(triviaEl);
  el.appendChild(button);
}
