class C {
  vals = [1, 2, 3];
  logSquares() {
    for (const val of this.vals) {
      console.log(val * val);
    }
  }
}
document.querySelector('input')!.addEventListener('change', function(e) {
  console.log(this);  // Logs the input element on which the event fired.
});
