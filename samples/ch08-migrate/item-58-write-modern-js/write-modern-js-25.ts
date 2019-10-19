async function getJSON(url: string) {
  const response = await fetch(url);
  return response.json();
}
