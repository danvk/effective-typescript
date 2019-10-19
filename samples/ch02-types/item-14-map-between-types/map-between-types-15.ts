interface SaveAction {
  type: 'save';
  // ...
}
interface LoadAction {
  type: 'load';
  // ...
}
type Action = SaveAction | LoadAction;
type ActionRec = Pick<Action, 'type'>;  // {type: "save" | "load"}
