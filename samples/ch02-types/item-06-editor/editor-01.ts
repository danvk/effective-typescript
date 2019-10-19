function getElement(elOrId: string|HTMLElement|null): HTMLElement {
  if (typeof elOrId === 'object') {
    return elOrId;
 // ~~~~~~~~~~~~~~ 'HTMLElement | null' is not assignable to 'HTMLElement'
  } else if (elOrId === null) {
    return document.body;
  } else {
    const el = document.getElementById(elOrId);
    return el;
 // ~~~~~~~~~~ 'HTMLElement | null' is not assignable to 'HTMLElement'
  }
}
