type Language = 'JavaScript' | 'TypeScript' | 'Python';
function setLanguage(language: Language) { /* ... */ }
// Parameter is a (latitude, longitude) pair.
function panTo(where: [number, number]) { /* ... */ }
const loc: [number, number] = [10, 20];
panTo(loc);  // OK
