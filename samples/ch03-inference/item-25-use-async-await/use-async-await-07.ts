// HIDE
function fetchURL(url: string, cb: (response: string) => void) {
  cb(url);
}
const url1 = '1';
const url2 = '2';
const url3 = '3';
// END
fetchURL(url1, function(response1) {
  fetchURL(url2, function(response2) {
    fetchURL(url3, function(response3) {
      // ...
      console.log(1);
    });
    console.log(2);
  });
  console.log(3);
});
console.log(4);

// Logs:
// 4
// 3
// 2
// 1
function timeout(millis: number): Promise<never> {
  return new Promise((resolve, reject) => {
     setTimeout(() => reject('timeout'), millis);
  });
}

async function fetchWithTimeout(url: string, ms: number) {
  return Promise.race([fetch(url), timeout(ms)]);
}
