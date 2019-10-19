function parseCSV(contents: string | Buffer): {[column: string]: string}[]  {
  if (typeof contents === 'object') {
    // It's a buffer
    return parseCSV(contents.toString('utf8'));
  }
  // COMPRESS
  return [];
  // END
}

