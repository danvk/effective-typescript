function getQuote(ticker: string) {
  return fetch(`https://quotes.example.com/?q=${ticker}`)
      .then(response => response.json());
}
