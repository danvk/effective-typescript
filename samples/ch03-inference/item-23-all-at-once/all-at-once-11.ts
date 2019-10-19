declare let hasMiddle: boolean;
const firstLast = {first: 'Harry', last: 'Truman'};
const president = {...firstLast, ...(hasMiddle ? {middle: 'S'} : {})};
const president: {
    middle: string;
    first: string;
    last: string;
} | {
    first: string;
    last: string;
}
