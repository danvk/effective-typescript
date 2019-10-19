interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}
const obj = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
};
const r: Room = obj;  // OK
