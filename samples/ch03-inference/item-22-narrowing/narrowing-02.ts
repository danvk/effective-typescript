const el = document.getElementById('foo'); // Type is HTMLElement | null
if (!el) throw new Error('Unable to find #foo');
el; // Now type is HTMLElement
el.innerHTML = 'Party Time'.blink();
