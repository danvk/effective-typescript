interface Person {
  firstName: string;
  lastName: string;
}
type PersonWithBirthDate = Person & { birth: Date };
