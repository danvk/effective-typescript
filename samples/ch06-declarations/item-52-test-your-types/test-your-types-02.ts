declare function map<U, V>(array: U[], fn: (u: U) => V): V[];
map(['2017', '2018', '2019'], v => Number(v));
