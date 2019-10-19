interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}
function setDarkMode() {}
interface Options {
  title: string;
  darkMode?: boolean;
}
const o1: Options = document;  // OK
const o2: Options = new HTMLAnchorElement;  // OK
