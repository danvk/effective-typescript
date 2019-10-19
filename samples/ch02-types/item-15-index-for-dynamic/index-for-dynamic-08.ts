function parseCSV(input: string): {[columnName: string]: string}[] {
  const lines = input.split('\n');
  const [header, ...rows] = lines;
  return rows.map(rowStr => {
    const row: {[columnName: string]: string} = {};
    rowStr.split(',').forEach((cell, i) => {
      row[header[i]] = cell;
    });
    return row;
  });
}
interface ProductRow {
  productId: string;
  name: string;
  price: string;
}

declare let csvData: string;
const products = parseCSV(csvData) as unknown as ProductRow[];
function safeParseCSV(
  input: string
): {[columnName: string]: string | undefined}[] {
  return parseCSV(input);
}
interface Row1 { [column: string]: number }  // Too broad
interface Row2 { a: number; b?: number; c?: number; d?: number }  // Better
type Row3 =
    | { a: number; }
    | { a: number; b: number; }
    | { a: number; b: number; c: number;  }
    | { a: number; b: number; c: number; d: number };
