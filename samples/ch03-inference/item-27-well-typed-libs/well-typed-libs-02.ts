// requires node modules: @types/lodash

const csvData = "...";
const rawRows = csvData.split('\n');
const headers = rawRows[0].split(',');
import _ from 'lodash';
const rows = rawRows.slice(1)
    .map(rowStr => _.zipObject(headers, rowStr.split(',')));
