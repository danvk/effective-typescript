interface Options {
  width: number;
  height: number;
  color: string;
  label: string;
}
type OptionsUpdate = {[k in keyof Options]?: Options[k]};
