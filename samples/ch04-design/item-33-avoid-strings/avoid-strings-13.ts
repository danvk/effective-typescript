type RecordingType = 'studio' | 'live';

interface Album {
  artist: string;
  title: string;
  releaseDate: Date;
  recordingType: RecordingType;
}
function pluck<T>(record: T[], key: keyof T) {
  return record.map(r => r[key]);
}
declare let albums: Album[];
const releaseDates = pluck(albums, 'releaseDate'); // Type is (string | Date)[]
