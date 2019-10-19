interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}
function setDarkMode() {}
interface Options {
  title: string;
  darkMode?: boolean;
}
const intermediate = { darkmode: true, title: 'Ski Free' };
const o: Options = intermediate;  // OK
