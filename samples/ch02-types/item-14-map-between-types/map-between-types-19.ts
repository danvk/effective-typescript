interface Options {
  width: number;
  height: number;
  color: string;
  label: string;
}
class UIWidget {
  constructor(init: Options) { /* ... */ }
  update(options: Partial<Options>) { /* ... */ }
}
