// HIDE
function fetchURL(url: string, cb: (response: string) => void) {
  setTimeout(() => {
    cb(url);
  }, 10);
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
async function fetchPages() {
  const [response1, response2, response3] = await Promise.all([
    fetch(url1), fetch(url2), fetch(url3)
  ]);
  // ...
}
