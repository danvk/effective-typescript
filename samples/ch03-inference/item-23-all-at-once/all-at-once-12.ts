declare let hasMiddle: boolean;
const firstLast = {first: 'Harry', last: 'Truman'};
const president = {...firstLast, ...(hasMiddle ? {middle: 'S'} : {})};
president.middle
       // ~~~~~~ Property 'middle' does not exist on type
       //        '{ first: string; last: string; }'
