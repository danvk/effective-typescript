// HIDE
type Color = { r: number; g: number; b: number };
// END
/** Get the foreground color for the application or a specific page. */
function getForegroundColor(page?: string): Color {
  // COMPRESS
  return page === 'login' ? {r: 127, g: 127, b: 127} : {r: 0, g: 0, b: 0};
  // END
}

