function arraySum(arr: number[]) {
  let sum = 0, num;
  while ((num = arr.pop()) !== undefined) {
    sum += num;
  }
  return sum;
}
