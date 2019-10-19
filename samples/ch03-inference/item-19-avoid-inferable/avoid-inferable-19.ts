const cache: {[ticker: string]: number} = {};
function getQuote(ticker: string) {
  if (ticker in cache) {
    return cache[ticker];
  }
  return fetch(`https://quotes.example.com/?q=${ticker}`)
      .then(response => response.json())
      .then(quote => {
        cache[ticker] = quote;
        return quote;
      });
}
function considerBuying(x: any) {}
getQuote('MSFT').then(considerBuying);
              // ~~~~ Property 'then' does not exist on type
              //        'number | Promise<any>'
              //      Property 'then' does not exist on type 'number'
