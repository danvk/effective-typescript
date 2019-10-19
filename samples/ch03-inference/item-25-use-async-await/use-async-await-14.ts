// Function getJSON(url: string): Promise<any>
async function getJSON(url: string) {
  const response = await fetch(url);
  const jsonPromise = response.json();  // Type is Promise<any>
  return jsonPromise;
}
