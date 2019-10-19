// requires node modules: @types/lodash

const csvData = "...";
const rawRows = csvData.split('\n');
const headers = rawRows[0].split(',');
import _ from 'lodash';
interface BasketballPlayer {
  name: string;
  team: string;
  salary: number;
}
declare const rosters: {[team: string]: BasketballPlayer[]};
const allPlayers = Object.values(rosters).flat();
// OK, type is BasketballPlayer[]
const salaries = _.map(allPlayers, 'salary');  // Type is number[]
const teams = _.map(allPlayers, 'team');  // Type is string[]
const mix = _.map(allPlayers, Math.random() < 0.5 ? 'name' : 'salary');
  // Type is (string | number)[]
