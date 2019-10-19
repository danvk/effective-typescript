function pluck(record: any[], key: string): any[] {
  return record.map(r => r[key]);
}
