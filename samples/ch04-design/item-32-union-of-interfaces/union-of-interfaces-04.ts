type FillPaint = unknown;
type LinePaint = unknown;
type PointPaint = unknown;
type FillLayout = unknown;
type LineLayout = unknown;
type PointLayout = unknown;
interface Layer {
  type: 'fill' | 'line' | 'point';
  layout: FillLayout | LineLayout | PointLayout;
  paint: FillPaint | LinePaint | PointPaint;
}
