interface Person {
  first: string;
  last: string;
}
function email(
  {person, subject, body}: {person: Person, subject: string, body: string}
) {
  // ...
}
