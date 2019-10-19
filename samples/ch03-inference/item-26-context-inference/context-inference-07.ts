type Language = 'JavaScript' | 'TypeScript' | 'Python';
function setLanguage(language: Language) { /* ... */ }
// Parameter is a (latitude, longitude) pair.
function panTo(where: [number, number]) { /* ... */ }
const loc = [10, 20] as const;
panTo(loc);
   // ~~~ Type 'readonly [10, 20]' is 'readonly'
   //     and cannot be assigned to the mutable type '[number, number]'
