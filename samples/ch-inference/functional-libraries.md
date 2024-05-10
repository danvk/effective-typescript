# Item 26: Use Functional Constructs and Libraries to Help Types Flow

## Things to Remember

- Use built-in functional constructs and those in utility libraries like Lodash instead of hand-rolled constructs to improve type flow, increase legibility, and reduce the need for explicit type annotations.


## Code Samples

```js
const csvData = "...";
const rawRows = csvData.split('\n');
const headers = rawRows[0].split(',');

const rows = rawRows.slice(1).map((rowStr) => {
  const row = {};
  rowStr.split(",").forEach((val, j) => {
    row[headers[j]] = val;
  });
  return row;
});
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMEDcAiBDKKYF4YCIB0BOA3AFCiSwBOKA7gEog0RZyKrp4QAOANgJZQAFAHIAOmGEBKUuWgwAFgFMUAE0WVm2avUYQA2gAYAup14CRAGimky4OZV0ttDJp37BFggIyS8AWxQuQUEHGgBlKEpJLAA+GABvEhg4OypGFniAX1Jk0IjKU34hHAscXwAzEEoAURRgeWCEFB4LGAAraMw4xOTcxj0lVXV9NqMjFiaeHJhM6SSYSkUoAFdKMAXGUlnSIA)

----

```ts
import _ from 'lodash';
const rows = rawRows.slice(1)
    .map(rowStr => _.zipObject(headers, rowStr.split(',')));
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMEDcAiBDKKYF4YCIB0BOA3AFCiSwBOKA7gEog0RZyKrp4QAOANgJZQAFAHIAOmGEBKUuWgwAFgFMUAE0WVm2avUYQA2gAYAup14CRAGimk+AWy4hKsAPowAZpRC2YwniBUoEPLCMuBynkws2gxMnPzAioIAjJIkMOkweLYoXIIRAMpQlFgAfDDOeABefFwA8gBGAFaKwEJKquoQFjAFRab8QsJWkiOkQA)

----

```ts
const rowsImperative = rawRows.slice(1).map(rowStr => {
  const row = {};
  rowStr.split(',').forEach((val, j) => {
    row[headers[j]] = val;
    // ~~~~~~~~~~~~ No index signature with a parameter of
    //              type 'string' was found on type '{}'
  });
  return row;
});
const rowsFunctional = rawRows.slice(1)
  .map((rowStr) =>
    rowStr
      .split(",")
      .reduce(
        (row, val, i) => ((row[headers[i]] = val), row),
        //                 ~~~~~~~~~~~~~~~ No index signature with a parameter of
        //                                 type 'string' was found on type '{}'
        {}
      )
  );
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMEDcAiBDKKYF4YCIB0BOA3AFCiSwBOKA7gEog0RZyKrp4QAOANgJZQAFAHIAOmGEBKUuWgwAFgFMUAE0WVm2avUYQA2gAYAup14CRAGimk+AWy4hKsAPowAZpRC2YwniBUoEPLCMuBynkwAkvbqaHwIiizaDEyc-MCKggCMkni2KFyCEQDKUJRYAHwwAN4kMHBhVIws1QC+pPUlZab8QsJWuW6OAKIowPKCgggoPBYwAFaSlTV19TARekqq6vrzRkYs0zwdawD0pzAAftc3t9cwAHIgMHxgagAeMBB8AOZgaABXSiJGgCeQwDBcFDUWyKKDqGAgNyrernNbojH1KAATy4iWE0Eorx+whgNEC7hAALeiLAMBxeJ8bWEq1a0lWwKgQLpEVIbNCFHWugAYtTgFA+OAZklaCkIGk+BlspJVnkCpMupQlpgKiihTRSpQ9fUeuYcBYcCrMXhgSoAUrjWsiow5kc5nxtVUNYxNso1Bo9Hx9ocZpI5hEw47URdMbG1ncE7dHs9Xh8vr9-lzgWSwRCYFCYXCEUiozA0XGK5WMQz8YTiaTycwhtSVLT6bj8czS21HVaYOygA)

----

```ts
const rowsLodash =
  rawRows.slice(1).map(rowStr => _.zipObject(headers, rowStr.split(',')));
rowsLodash
// ^? const rowsLodash: _.Dictionary<string>[]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMEDcAiBDKKYF4YCIB0BOA3AFCiSwBOKA7gEog0RZyKrp4QAOANgJZQAFAHIAOmGEBKUuWgwAFgFMUAE0WVm2avUYQA2gAYAup14CRAGimk+AWy4hKsAPowAZpRC2YwniBUoEPLCMuBynkwAMv6B8lgkMDDaDEyc-MCKggCMkni2KFyCEQDKUJRYAHwwzngAXnxcAPIARgBWisBCSqrqEBZJjKWUpvxCwlaSk6QRENEBQSQA9IswAHoA-HBhVLpzsQBc1XhIfJ184CiUAJ4APNCUfGAA5hV6RiRAA)

----

```ts
interface BasketballPlayer {
  name: string;
  team: string;
  salary: number;
}
declare const rosters: {[team: string]: BasketballPlayer[]};
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMEDcAiBDKKYF4YCIB0BOA3AFCiSwBOKA7gEog0RZyKrp4QAOANgJZQAFAHIAOmGEBKUuWgwAFgFMUAE0WVm2avUYQA2gAYAup14CRAGimk+AWy4hKsAPowAZpRC2YwniBUoEPLCNmBQ6m4owIowAEKBANaKUABGKDw8AAo8KACe6jAA3iQwMGAotooAXDDQlHxgAOakpeEVNXUNzSW16SiUuTVgAK62KeqkAL4kasA5lDGyVCDQ6hA1hXptth1Q9U1GNfEQSanpWTn5lHpGk6RAA)

----

```ts
let allPlayers = [];
//  ~~~~~~~~~~ Variable 'allPlayers' implicitly has type 'any[]'
//             in some locations where its type cannot be determined
for (const players of Object.values(rosters)) {
  allPlayers = allPlayers.concat(players);
  //           ~~~~~~~~~~ Variable 'allPlayers' implicitly has an 'any[]' type
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMEDcAiBDKKYF4YCIB0BOA3AFCiSwBOKA7gEog0RZyKrp4QAOANgJZQAFAHIAOmGEBKUuWgwAFgFMUAE0WVm2avUYQA2gAYAup14CRAGimk+AWy4hKsAPowAZpRC2YwniBUoEPLCNmBQ6m4owIowAEKBANaKUABGKDw8AAo8KACe6jAA3iQwMGAotooAXDDQlHxgAOakpeEVNXUNzSW16SiUuTVgAK62KeqkAL4kasA5lDGyVCDQ6hA1hXptth1Q9U1GNfEQSanpWTn5lHpGk6Q8yTDn2XlrLDekAPSfpQB+-wDATAAGr9PgoFIPHzPS5rYQwOxmYACHi5BSBGBQXJcGLCFBgXI3YQkb6lMnk8kNWpeGJ+YBoPjgZg0JQLBFQZhYnFwfFgECwcYwNThSi2BqKFQkNyOGCCJYwXivDQwEBuGAAeRSACtFMAoHgEOlhooIIJPKsNJJJEUejClZonhkXlcIHhyPShIqXdIeqSKRTAYHfiCwRCoXinbCNPDEfxkVBUejmPjoQSiZjsYoSNMgA)

----

```ts
let allPlayers: BasketballPlayer[] = [];
for (const players of Object.values(rosters)) {
  allPlayers = allPlayers.concat(players);  // OK
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMEDcAiBDKKYF4YCIB0BOA3AFCiSwBOKA7gEog0RZyKrp4QAOANgJZQAFAHIAOmGEBKUuWgwAFgFMUAE0WVm2avUYQA2gAYAup14CRAGimk+AWy4hKsAPowAZpRC2YwniBUoEPLCNmBQ6m4owIowAEKBANaKUABGKDw8AAo8KACe6jAA3iQwMGAotooAXDDQlHxgAOakpeEVNXUNzSW16SiUuTVgAK62KeqkAL4kasA5lDGyVCDQ6hA1hXptth1Q9U1GNfEQSanpWTn5lHpGk6Q8yTDn2XlrR4nJaRkvVzcsN6Q3I4YIIljBeK8NDAQG4YAB5FIAK0UwCgeAQ6WGigggk8qw0kkkRR6z0uaxYpMhEDw5GAaEEEKuEGkpQA9Kz4QBpEjTIA)

----

```ts
const allPlayers = Object.values(rosters).flat(); // OK
//    ^? const allPlayers: BasketballPlayer[]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMEDcAiBDKKYF4YCIB0BOA3AFCiSwBOKA7gEog0RZyKrp4QAOANgJZQAFAHIAOmGEBKUuWgwAFgFMUAE0WVm2avUYQA2gAYAup14CRAGimk+AWy4hKsAPowAZpRC2YwniBUoEPLCNmBQ6m4owIowAEKBANaKUABGKDw8AAo8KACe6jAA3iQwMGAotooAXDDQlHxgAOakpeEVNXUNzSW16SiUuTVgAK62KeqkAL4kasA5lDGyVCDQ6hA1hXptth1Q9U1GNfEQSanpWTn5lHpGkzLgcufZeWssAPIpAFaKwFB4COlhooIIJPKsNJI8G4ckJpDAAPTwmBvADSJERpVKAD0APxwB6wJ6XNZHRLJNIZZ5XG4kIA)

----

```ts
const teamToPlayers: {[team: string]: BasketballPlayer[]} = {};
for (const player of allPlayers) {
  const {team} = player;
  teamToPlayers[team] = teamToPlayers[team] || [];
  teamToPlayers[team].push(player);
}

for (const players of Object.values(teamToPlayers)) {
  players.sort((a, b) => b.salary - a.salary);
}

const bestPaid = Object.values(teamToPlayers).map(players => players[0]);
bestPaid.sort((playerA, playerB) => playerB.salary - playerA.salary);
console.log(bestPaid);
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMEDcAiBDKKYF4YCIB0BOA3AFCiSwBOKA7gEog0RZyKrp4QAOANgJZQAFAHIAOmGEBKUuWgwAFgFMUAE0WVm2avUYQA2gAYAup14CRAGimk+AWy4hKsAPowAZpRC2YwniBUoEPLCNmBQ6m4owIowAEKBANaKUABGKDw8AAo8KACe6jAA3iQwMGAotooAXDDQlHxgAOakpeEVNXUNzSW16SiUuTVgAK62KeqkAL4kasA5lDGyVCDQ6hA1hXptth1Q9U1GNfEQSanpWTn5lHpGkzLgcufZeWssAPIpAFaKwFB4COlhooIIJPKsNJI8G4ckJpDAAPTwmBvADSJERpVKAD0APxwB6wJ6XNZHRLJNIZZ5XG5kAkwbYAFRAVJJRS2yh2tT2XUOcTJZ0pxOutxYhTuJDcjhggiWMF4L0oMBAbhgRIVEEkRR6ssK20mLHlVxa9I5TJZGnZFSMLEZzKF+m21oAPk6YDdjbbzQ6OSYuMMgoJDeppCRphKpTK6UGNEqVR9vr9-oDgYJPfbJJriqVoxBOI4hIIUBYYClNZgAHwlzh9AYwAC0qur81yIbDsvG0EyKD4KneXx+fwBPCBILT6shthQXED9qwlZzhiMIY7UC7PbzTkEM4VAEFi9HYmX50LYk3+rl63KhTuzwMQ7IQDxFHg-I1BCu1yoQ0A)

----

```ts
const bestPaid = _(allPlayers)
  .groupBy(player => player.team)
  .mapValues(players => _.maxBy(players, p => p.salary)!)
  .values()
  .sortBy(p => -p.salary)
  .value();
console.log(bestPaid.slice(0, 10));
//          ^? const bestPaid: BasketballPlayer[]
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBMEDcAiBDKKYF4YCIB0BOA3AFCiSwBOKA7gEog0RZyKrp4QAOANgJZQAFAHIAOmGEBKUuWgwAFgFMUAE0WVm2avUYQA2gAYAup14CRAGimk+AWy4hKsAPowAZpRC2YwniBUoEPLCNmBQ6m4owIowAEKBANaKUABGKDw8AAo8KACe6jAA3iQwMGAotooAXDDQlHxgAOakpeEVNXUNzSW16SiUuTVgAK62KeqkAL4kasA5lDGyVCDQ6hA1hXptth1Q9U1GNfEQSanpWTn5lHpGkzLgcufZeWssAPIpAFaKwFB4COlhooIIJPKsNJI8G4ckJpDAAPTwmBvADSJERpVKAD0APxwB6wJ6XNZHRLJNIZZ5XG5kAkwcbQTIoPgqFjOQREl4Qnp4RqeYZcWK5QS8LlYAB8MFFVzw20kPNsKC4ADVAcCRcSNBKYM48IqAB5CjVciAWKXaricPoDSQAQnlpX+apBDpgnEcUCNXG1AFpLRBrblXU6eEDBNJaZAQDxFHg-I1BAyoEyWZx+NFBAYzQBGAySCMYzFF7F4pb04HJ5kqUkncmc6lGEhAA)
