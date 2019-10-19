type RecordingType = 'studio' | 'live';

interface Album {
  artist: string;
  title: string;
  releaseDate: Date;
  recordingType: RecordingType;
}
type K = keyof Album;
// Type is "artist" | "title" | "releaseDate" | "recordingType"
