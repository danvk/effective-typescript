const checkedFetch: typeof fetch = async (input, init) => {
  //  ~~~~~~~~~~~~   Type 'Promise<Response | HTTPError>'
  //                     is not assignable to type 'Promise<Response>'
  //                   Type 'Response | HTTPError' is not assignable
  //                       to type 'Response'
  const response = await fetch(input, init);
  if (!response.ok) {
    return new Error('Request failed: ' + response.status);
  }
  return response;
}
