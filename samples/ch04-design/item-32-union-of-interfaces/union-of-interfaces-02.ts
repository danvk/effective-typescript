type FillPaint = unknown;
type LinePaint = unknown;
type PointPaint = unknown;
type FillLayout = unknown;
type LineLayout = unknown;
type PointLayout = unknown;
interface Layer {
  layout: FillLayout | LineLayout | PointLayout;
  paint: FillPaint | LinePaint | PointPaint;
}
