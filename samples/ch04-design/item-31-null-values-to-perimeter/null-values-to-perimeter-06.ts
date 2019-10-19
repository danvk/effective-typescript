function extent(nums: number[]) {
  let result: [number, number] | null = null;
  for (const num of nums) {
    if (!result) {
      result = [num, num];
    } else {
      result = [Math.min(num, result[0]), Math.max(num, result[1])];
    }
  }
  return result;
}
const range = extent([0, 1, 2]);
if (range) {
  const [min, max] = range;
  const span = max - min;  // OK
}
