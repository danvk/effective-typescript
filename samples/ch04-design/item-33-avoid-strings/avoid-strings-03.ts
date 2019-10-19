interface Album {
  artist: string;
  title: string;
  releaseDate: string;  // YYYY-MM-DD
  recordingType: string;  // E.g., "live" or "studio"
}
const kindOfBlue: Album = {
  artist: 'Miles Davis',
  title: 'Kind of Blue',
  releaseDate: 'August 17th, 1959',  // Oops!
  recordingType: 'Studio',  // Oops!
};  // OK
function recordRelease(title: string, date: string) { /* ... */ }
recordRelease(kindOfBlue.releaseDate, kindOfBlue.title);  // OK, should be error
