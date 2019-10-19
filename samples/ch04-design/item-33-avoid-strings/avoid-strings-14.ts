function pluck<T, K extends keyof T>(record: T[], key: K): T[K][] {
  return record.map(r => r[key]);
}
