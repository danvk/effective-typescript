function pluck<T, K extends keyof T>(record: T[], key: K): T[K][] {
  return record.map(r => r[key]);
}
type RecordingType = 'studio' | 'live';

interface Album {
  artist: string;
  title: string;
  releaseDate: Date;
  recordingType: RecordingType;
}
declare let albums: Album[];
pluck(albums, 'releaseDate'); // Type is Date[]
pluck(albums, 'artist');  // Type is string[]
pluck(albums, 'recordingType');  // Type is RecordingType[]
pluck(albums, 'recordingDate');
           // ~~~~~~~~~~~~~~~ Argument of type '"recordingDate"' is not
           //                 assignable to parameter of type ...
