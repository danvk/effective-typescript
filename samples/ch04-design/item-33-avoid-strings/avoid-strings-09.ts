function pluck<T>(record: T[], key: string): any[] {
  return record.map(r => r[key]);
                      // ~~~~~~ Element implicitly has an 'any' type
                      //        because type '{}' has no index signature
}
