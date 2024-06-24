# Typescript bindings and utils for the UEFA API

This package provides typings as well as utility functions to retrieve matches, teams, players, competitions and
statistics from the UEFA API.
The API provides data for all official UEFA competitions, such as the EURO, Champions League, Europa League, Nations
League, etc.

## Usage
1. Install the package
```bash
npm install uefa-api
```

2. Import and use the package
```typescript
import { getLivescore, getMatches } from 'uefa-api';

const livescore = await getLivescore();
const matchId = livescore[0].id;
const score = livescore[0].score.regular;

const matches = await getMatches({
  competitionId: 3,
  seasonYear: 2024
});
```
## Methods
For the results of the methods, check the typings [here](https://github.com/ErikMichelson/uefa-api/blob/HEAD/src/api.d.ts).

### `getLivescore(): Livescore[]`
Returns the score of currently running matches as well as information about upcoming matches in the next hour as well as
finished matches in the last hour.

### `getCompetitions(ids): Competition[]`
Returns a list of competitions. When no ids are provided, all competitions are returned. `ids` can be an array or single
value.

### `getMatches(options, sortOrder, limit, offset): Match[]`
Returns a list of matches for the given filter options. The `options` object can contain the following properties:

- `competitionId`: The id of the competition
- `seasonYear`: The year of the season
- `groupId`: The id of the match group
- `opponentTeamIds`: An array of team ids

Alternatively, you can provide a set of match ids to retrieve specific matches.

- `matchId`: An array of match ids

### `getMatch(id): Match`
Returns a single match by its id.

### `getMatchStats(id): MatchStats[]`
Returns the statistics for a match by its id for each team.

### `getLineups(id): Lineup`
Returns the lineup for a match by its id for each team.

### `getMatchEvents(id, sortOrder, limit, offset): MatchEventDetails[]`
Returns a list of events for a match by its id. Events are for example goals, cards, substitutions, etc.

### `getPlayers(options, limit, offset): Player[]`
Returns a list of players for the given filter options. The `options` object can contain the following properties:

- `competitionId`
- `seasonYear`

Alternatively, you can provide a set of player ids to retrieve specific players.

- `playerIds`: An array of player ids

### `getStandings(options): Standing[]`
Returns a list of standings for the given filter options. The `options` object can contain the following properties:

- `competitionId`
- `seasonYear`
- `groupIds`
- `roundId`
- `phase`

### `getTeams(options, limit, offset): Team[]`
Returns a list of teams for the given filter options. The `options` object can contain the following properties:

- `competitionId`
- `seasonYear`
- `roundIds`
- `associationId`

Alternatively, you can provide a set of team ids to retrieve specific teams.

- `teamIds`: An array of team ids

## Contributions
Contributions are welcome. Please open an issue or a pull request and include links to sample API requests when
reporting issues or inconsistencies with the typings.

## License
This package is licensed under the MIT license.
