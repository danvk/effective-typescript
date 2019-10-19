interface Person {
  name: string;
  birth?: {
    place: string;
    date: Date;
  }
}
function eulogize(p: Person) {
  console.log(p.name);
  const {birth} = p;
  if (birth) {
    console.log(`was born on ${birth.date} in ${birth.place}.`);
  }
}
