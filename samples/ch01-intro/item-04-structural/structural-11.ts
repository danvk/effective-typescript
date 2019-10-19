interface PostgresDB {
  runQuery: (sql: string) => any[];
}
