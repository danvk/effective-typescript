class Person {
  first: string;
  last: string;
  constructor(public name: string) {
    [this.first, this.last] = name.split(' ');
  }
}
