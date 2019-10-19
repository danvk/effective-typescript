const utils = {
  buildColumnInfo(s: any, name: string): any {},
};
declare let appState: { dataSchema: unknown };
function getColumnInfo(name: string): any {
  return utils.buildColumnInfo(appState.dataSchema, name);  // Returns any
}
