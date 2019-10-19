type RecordingType = 'studio' | 'live';

interface Album {
  artist: string;
  title: string;
  releaseDate: Date;
  recordingType: RecordingType;
}
function getAlbumsOfType(recordingType: string): Album[] {
  // COMPRESS
  return [];
  // END
}

