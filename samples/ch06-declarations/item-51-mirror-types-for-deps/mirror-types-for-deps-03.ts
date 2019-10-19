interface CsvBuffer {
  toString(encoding: string): string;
}
function parseCSV(contents: string | CsvBuffer): {[column: string]: string}[]  {
  // COMPRESS
  return [];
  // END
}

parseCSV(new Buffer("column1,column2\nval1,val2", "utf-8"));  // OK
