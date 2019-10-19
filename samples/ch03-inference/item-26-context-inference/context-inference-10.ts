type Language = 'JavaScript' | 'TypeScript' | 'Python';
interface GovernedLanguage {
  language: Language;
  organization: string;
}

function complain(language: GovernedLanguage) { /* ... */ }

complain({ language: 'TypeScript', organization: 'Microsoft' });  // OK

const ts = {
  language: 'TypeScript',
  organization: 'Microsoft',
};
complain(ts);
//       ~~ Argument of type '{ language: string; organization: string; }'
//            is not assignable to parameter of type 'GovernedLanguage'
//          Types of property 'language' are incompatible
//            Type 'string' is not assignable to type 'Language'
