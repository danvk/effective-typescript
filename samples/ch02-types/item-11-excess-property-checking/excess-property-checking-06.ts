interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}
function setDarkMode() {}
interface Options {
  title: string;
  darkMode?: boolean;
}
const o: Options = { darkmode: true, title: 'Ski Free' };
                  // ~~~~~~~~ 'darkmode' does not exist in type 'Options'...
