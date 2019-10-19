interface LineChartOptions {
  logscale?: boolean;
  invertedYAxis?: boolean;
  areaChart?: boolean;
}
const opts = { logScale: true };
const o: LineChartOptions = opts;
   // ~ Type '{ logScale: boolean; }' has no properties in common
   //   with type 'LineChartOptions'
