interface Name {
  name: string;
}

interface PersonWithBirth extends Name {
  placeOfBirth: string;
  dateOfBirth: Date;
}

type Person = Name | PersonWithBirth;
function eulogize(p: Person) {
  if ('placeOfBirth' in p) {
    p // Type is PersonWithBirth
    const {dateOfBirth} = p  // OK, type is Date
  }
}
