async function checkedFetch(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    // Converted to a rejected Promise in an async function
    throw new Error('Request failed: ' + response.status);
  }
  return response;
}
