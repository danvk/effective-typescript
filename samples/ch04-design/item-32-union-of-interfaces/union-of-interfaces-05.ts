type FillPaint = unknown;
type LinePaint = unknown;
type PointPaint = unknown;
type FillLayout = unknown;
type LineLayout = unknown;
type PointLayout = unknown;
interface FillLayer {
  type: 'fill';
  layout: FillLayout;
  paint: FillPaint;
}
interface LineLayer {
  type: 'line';
  layout: LineLayout;
  paint: LinePaint;
}
interface PointLayer {
  type: 'paint';
  layout: PointLayout;
  paint: PointPaint;
}
type Layer = FillLayer | LineLayer | PointLayer;
