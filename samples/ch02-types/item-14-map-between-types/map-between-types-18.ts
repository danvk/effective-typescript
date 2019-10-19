interface Options {
  width: number;
  height: number;
  color: string;
  label: string;
}
type OptionsKeys = keyof Options;
// Type is "width" | "height" | "color" | "label"
