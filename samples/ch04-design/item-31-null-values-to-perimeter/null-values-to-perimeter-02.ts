function extent(nums: number[]) {
  let min, max;
  for (const num of nums) {
    if (!min) {
      min = num;
      max = num;
    } else {
      min = Math.min(min, num);
      max = Math.max(max, num);
                  // ~~~ Argument of type 'number | undefined' is not
                  //     assignable to parameter of type 'number'
    }
  }
  return [min, max];
}
