interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}
const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
// ~~~~~~~~~~~~~~~~~~ Object literal may only specify known properties,
//                    and 'elephant' does not exist in type 'Room'
};
