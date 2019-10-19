// checkJs
// tsConfig: {"strictNullChecks":false,"allowJs":true,"noEmit":true}

// @ts-check
const ageEl = /** @type {HTMLInputElement} */(document.getElementById('age'));
ageEl.value = '12';  // OK
