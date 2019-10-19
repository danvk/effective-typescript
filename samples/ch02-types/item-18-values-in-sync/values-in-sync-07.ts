interface ScatterProps {
  // The data
  xs: number[];
  ys: number[];

  // Display
  xRange: [number, number];
  yRange: [number, number];
  color: string;

  // Events
  onClick: (x: number, y: number, index: number) => void;
}
interface ScatterProps {
  // ...
  onDoubleClick: () => void;
}
const REQUIRES_UPDATE: {[k in keyof ScatterProps]: boolean} = {
  //  ~~~~~~~~~~~~~~~ Property 'onDoubleClick' is missing in type
  // COMPRESS
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,
  color: true,
  onClick: false,
  // END
};

