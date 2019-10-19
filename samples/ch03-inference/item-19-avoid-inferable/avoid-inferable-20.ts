const cache: {[ticker: string]: number} = {};
function getQuote(ticker: string): Promise<number> {
  if (ticker in cache) {
    return cache[ticker];
        // ~~~~~~~~~~~~~ Type 'number' is not assignable to 'Promise<number>'
  }
  // COMPRESS
  return Promise.resolve(0);
  // END
}

