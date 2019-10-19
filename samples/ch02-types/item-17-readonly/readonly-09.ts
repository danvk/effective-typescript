const dates: readonly Date[] = [new Date()];
dates.push(new Date());
   // ~~~~ Property 'push' does not exist on type 'readonly Date[]'
dates[0].setFullYear(2037);  // OK
