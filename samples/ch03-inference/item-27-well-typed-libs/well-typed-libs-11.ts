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
const namesA = allPlayers.map(player => player.name)  // Type is string[]
const namesB = _.map(allPlayers, player => player.name)  // Type is string[]
const namesC = _.map(allPlayers, 'name');  // Type is string[]
