import type { Iso31661A2 } from './iso3166-1-a2'

export interface ApiErrorResponse {
  error: ApiError
}

export interface ApiError {
  /** The HTTP status code of the error */
  status: number

  /** The title of the error */
  title: string

  /** The error message */
  message: string
}

export interface Match {
  /** The unique id of the match */
  id: string

  /** The competition to which the match belongs */
  competition: Competition

  /** The season of the competition */
  seasonYear: string

  /** The number of the match in the season */
  matchNumber?: number

  /** The session number of the match */
  sessionNumber: number

  /** Information about the match day */
  matchday: Matchday

  /** Information about the leg in two-legged ties */
  leg?: Leg

  /** Related matches (like 2nd leg) */
  relatedMatches?: Match[]

  /** Whether the match is private or public */
  behindClosedDoors?: boolean

  /** The start time of the match (kick-off) */
  kickOffTime: KickOffTime

  /** The time when the match was finished in ISO 8601 format */
  fullTimeAt?: string

  /** The status of the match */
  status:
    | 'UPCOMING'
    | 'FINISHED'
    | 'LIVE'
    | 'CURRENT'
    | 'ABANDONED'
    | 'CANCELED'

  /** The phase of the running match */
  phase?: MatchPhase

  /** The current minute of the running match */
  minute?: {
    normal?: number
    injury?: number
  }

  /** The type of the match */
  type: 'GROUP_STAGE' | 'SINGLE' | 'FIRST_LEG' | 'SECOND_LEG'

  /** The status of the lineup */
  lineupStatus: LineupStatus

  /** The home team */
  homeTeam: Team

  /** The away team */
  awayTeam: Team

  /** The round of the competition to which the match belongs */
  round: Round

  /** The group of the match (only in group stage) */
  group?: Group

  /** The stadium where the match is played */
  stadium?: Stadium

  /** The count of people attending the match */
  matchAttendance?: number

  /** The weather condition during the match */
  condition?: Condition

  /** The referees of the match */
  referees: Referee[]

  /** The set of URLs for the live stream in the different languages */
  streamUrl?: Translated<string>

  /** The score of the match */
  score?: Score

  /** The winner of the match */
  winner?: Winner

  /** The events of the match */
  playerEvents?: PlayerEvents

  /** The player of the match */
  playerOfTheMatch?: PlayerOfTheMatch

  translations?: {
    /** The translated name of the current match phase */
    phaseName?: Translated<string>
  }
}

type Translated<T> = Record<Iso31661A2, T>

// TODO: This seems incomplete
export type MatchPhase =
  | 'FIRST_HALF'
  | 'SECOND_HALF'
  | 'PENALTY'
  | 'EXTRA_TIME_FIRST_HALF'
  | 'EXTRA_TIME_SECOND_HALF'
  | 'HALF_TIME_BREAK'

export interface Team {
  /** The id of the team */
  id: string

  /** The id of the association */
  associationId?: string

  /** The id of the organization */
  organizationId?: string

  /** Whether this is a real team or a placeholder for matches where the teams are not yet set */
  isPlaceHolder: boolean

  /** The international name of the team */
  internationalName: string

  /** The code of the country where the team is originated */
  countryCode?: string

  /** The code of the team */
  teamCode: string

  /** Translated versions of the team and country name */
  translations: {
    countryName?: Translated<string>
    displayName: Translated<string>
    displayOfficialName: Translated<string>
    displayTeamCode?: Translated<string>
  }

  /** The type of the team */
  typeTeam: 'DOMESTIC' | 'NATIONAL' | 'PLACEHOLDER'

  /** Whether the team is a national team or not */
  typeIsNational: boolean

  /** The detailed team type */
  teamTypeDetail: 'FAKE' | string

  /** The confederation of the team */
  confederationType?: 'UEFA' | 'CONMEBOL' | 'CAF' | 'AFC' | 'CONCACAF' | string

  /** The provider of the id */
  idProvider: 'FAME' | string

  /** The URL to the small team logo */
  logoUrl: string

  /** The URL to the medium-sized team logo */
  mediumLogoUrl: string

  /** The URL to the big team logo */
  bigLogoUrl: string

  /** The URL to the association logo */
  associationLogoUrl?: string
}

export interface Winner {
  /** The winner of the match */
  match: WinnerDetails

  /** The aggregated winner */
  aggregate?: WinnerDetails
}

export interface WinnerDetails {
  /** The reason for winning the match */
  reason:
    | 'WIN_REGULAR'
    | 'WIN_ON_PENALTIES'
    | 'WIN_ON_AGGREGATE'
    | 'WIN_ON_AWAY_GOAL'
    | 'WIN_ON_EXTRA_TIME'
    | 'WIN_BY_FORFEIT'
    | 'DRAW'

  /** The winning team */
  team?: Team

  /** Translated versions of the reason for winning the match */
  translations?: {
    reasonTextAbbr: Translated<string>
    reasonText?: Translated<string>
  }
}

export interface Score {
  /** The regular score result */
  regular: ScoreResult

  /** The total score result including overtime */
  total: ScoreResult

  /** The score result after penalties */
  penalty?: ScoreResult

  /** The score result after aggregate */
  aggregate?: ScoreResult
}

export interface ScoreResult {
  /** The amount of goals by the home team */
  home: number

  /** The amount of goals by the guest team */
  away: number
}

export interface Condition {
  /** The temperature in degrees celsius */
  temperature: number

  /** The humidity in percentage */
  humidity?: number

  /** The wind speed in km/h */
  windSpeed?: number

  /** The pitch condition */
  pitchCondition?: 'WET' | 'SOFT' | 'EXCELLENT' | 'DRY'

  /** The weather condition */
  weatherCondition?: string

  /** The translations of the pitch and weather condition */
  translations?: {
    pitchConditionName: Translated<string>
    weatherConditionName: Translated<string>
  }
}

export interface KickOffTime {
  /** The date of the match in YYYY-MM-DD format */
  date: string

  /** The time of the match in ISO 8601 format */
  dateTime?: string

  /** The time zone of the match */
  utcOffsetInHours?: number
}

export interface Matchday {
  /** The id of the matchday */
  id: string

  /** The type of the matchday */
  type: 'MATCHDAY' | 'FINAL' | 'FIRST_LEG' | 'SECOND_LEG'

  /** The id of the competition */
  competitionId: string

  /** The year of the season */
  seasonYear: string

  /** The id of the round */
  roundId: string

  /** The sequence number of the matchday */
  sequenceNumber: string

  /** The format of the matchday */
  format:
    | 'REGULAR'
    | 'EXTRA_TIME_WITH_PENALTIES'
    | 'PENALTIES_WITHOUT_EXTRA_TIME'
    | 'U_17_REGULAR'
    | 'U_17_EXTRA_TIME_WITH_PENALTIES'
    | 'U_17_PENALTIES_WITHOUT_EXTRA_TIME'
    | 'FUTSAL_REGULAR'
    | 'FUTSAL_EXTRA_TIME_WITH_PENALTIES'
    | 'FUTSAL_PENALTIES_WITHOUT_EXTRA_TIME'
    | string

  /** The date when the matchday starts in ISO 8601 format */
  dateFrom?: string

  /** The date when the matchday ends in ISO 8601 format */
  dateTo?: string

  /** The short name of the matchday */
  name: string

  /** The long name of the matchday */
  longName: string

  /** The translations of the matchday name */
  translations: {
    name: Translated<string>
    longName: Translated<string>
  }
}

export interface Stadium {
  /** The id of the stadium */
  id: string

  /** The code of the country where the stadium is located */
  countryCode: string

  /** The capacity of the stadium */
  capacity: number

  /** The dimensions of the pitch in the stadium in meters */
  pitch?: {
    length: number
    width: number
  }

  /** The opening date of the stadium in YYYY-MM-DD format */
  openingDate?: string

  /** The translated names of the stadium */
  translations: {
    name: Translated<string>
    officialName: Translated<string>
    sponsorName: Translated<string>
    mediaName: Translated<string>
    specialEventsName: Translated<string>
  }

  /** The address of the stadium */
  address?: string

  /** The city where the stadium is located */
  city: City

  /** The geolocation of the stadium */
  geolocation?: {
    latitude: number
    longitude: number
  }

  /** URLs to images of the stadium in different formats */
  images: {
    MEDIUM_WIDE?: string
    LARGE_ULTRA_WIDE?: string
  } & Record<Uppercase<string>, string>
}

export interface City {
  /** The id of the city */
  id: string

  /** The code of the country where the city is located */
  countryCode: string

  /** The translations of the city name */
  translations: {
    name: Translated<string>
  }
}

export interface Referee {
  /** The role of the referee */
  role:
    | 'REFEREE'
    | 'REFEREE_ONE'
    | 'REFEREE_TWO'
    | 'REFEREE_THREE'
    | 'ASSISTANT_REFEREE_ONE'
    | 'ASSISTANT_REFEREE_TWO'
    | 'FOURTH_OFFICIAL'
    | 'TIMEKEEPER'
    | 'ADDITIONAL_ASSISTANT_REFEREE_ONE'
    | 'ADDITIONAL_ASSISTANT_REFEREE_TWO'
    | 'VIDEO_ASSISTANT_REFEREE'
    | 'ASSISTANT_VIDEO_ASSISTANT_REFEREE'
    | 'ASSISTANT_VIDEO_ASSISTANT_REFEREE_ONE'
    | 'ASSISTANT_VIDEO_ASSISTANT_REFEREE_TWO'
    | 'ASSISTANT_VIDEO_ASSISTANT_REFEREE_THREE'
    | 'REFEREE_OBSERVER'
    | 'UEFA_DELEGATE'

  /** The person acting as a referee */
  person: OfficialPerson

  /** URLs to images of the referee */
  images: {
    SMALL_SQUARE: string
  } & Record<Uppercase<string>, string>

  /** The translations of the referee role */
  translations: {
    roleName: Translated<string>
  }
}

export interface OfficialPerson {
  /** The id of the person */
  id: string

  /** The gender of the person */
  gender: 'MALE' | 'FEMALE'

  /** The code of the country where the person is originating from */
  countryCode?: string

  translations: {
    /** The translated name of the person */
    name: Translated<string>

    /** The translated first name of the person */
    firstName: Translated<string>

    /** The translated last name of the person */
    lastName: Translated<string>

    /** The translated short name of the person */
    shortName: Translated<string>

    /** The translated name of the country where the person is originating from */
    countryName?: Translated<string>
  }
}

export interface Competition {
  /** The unique identifier of the competition */
  id: string

  /** The code of the competition */
  code?: string

  /** The type of sport for the competition */
  sportsType?: 'FOOTBALL' | 'FUTSAL'

  /** The type of the competition */
  type?: 'CUP' | 'LEAGUE'

  /** The category of the team participating in the competition */
  teamCategory?: 'CLUB' | 'NATIONAL'

  /** The age group of the competition */
  age?: 'ADULT' | 'YOUTH'

  /** The gender of the participants in the competition */
  sex?: 'MALE' | 'FEMALE'

  /** The region where the competition is held */
  region: 'CONTINENTAL' | 'DOMESTIC' | 'WORLDWIDE'

  /** Additional metadata about the competition */
  metaData: {
    /** The name of the competition */
    name: string
  }

  images: {
    /** The URL to the full logo of the competition */
    FULL_LOGO: string
  }

  /** Translated names of the competition and country */
  translations: {
    name: Translated<string>
    prequalifyingName: Translated<string>
    qualifyingName: Translated<string>
    tournamentName: Translated<string>
    countryName?: Translated<string>
  }
}

export interface PlayerOfTheMatch {
  /** The nominated player of the match */
  player: Player

  /** The id of the team to which the player belongs */
  teamId: string
}

export interface Player {
  /** The unique identifier of the player */
  id: string

  /** The international name of the player */
  internationalName: string

  /** The gender of the player */
  gender: 'MALE' | 'FEMALE'

  /** The code of the country where the player is originated */
  countryCode: string

  /** The id of the club to which the player belongs */
  clubId?: string

  /** The jersey number of the player in the club */
  clubJerseyNumber?: string

  /** The shirt name of the player in the club */
  clubShirtName?: string

  /** The age of the player */
  age: string

  /** The birthdate of the player in YYYY-MM-DD format */
  birthDate: string

  /** The code of the country where the player was born */
  countryOfBirthCode?: string

  /** The field position of the player */
  fieldPosition?: 'FORWARD' | 'MIDFIELDER' | 'DEFENDER' | 'GOALKEEPER'

  /** The detailed field position of the player */
  detailedFieldPosition?:
    | 'CENTRAL_MIDFIELDER'
    | 'STRIKER'
    | 'WINGER'
    | 'UNKNOWN'
    | 'CENTRE_BACK'
    | 'ATTACKING_MIDFIELDER'
    | 'FULL_BACK'
    | 'DEFENSIVE_MIDFIELDER'
    | 'GOALKEEPER'

  /** The id of the national team to which the player belongs */
  nationalTeamId?: string

  /** The jersey number of the player in the national team */
  nationalJerseyNumber?: string

  /** The shirt name of the player in the national team */
  nationalShirtName?: string

  /** The field position of the player in the national team */
  nationalFieldPosition?: string

  /** The height of the player in centimeters */
  height?: number

  /** The weight of the player in kilograms */
  weight?: number

  /** URL to an image of the player */
  imageUrl: string

  translations: {
    /** The translated name of the player */
    name: Translated<string>

    /** The translated first name of the player */
    firstName?: Translated<string>

    /** The translated last name of the player */
    lastName: Translated<string>

    /** The translated short name of the player */
    shortName: Translated<string>

    /** The translated name of the country where the player is originated */
    countryName?: Translated<string>

    /** The translated name of the country where the player was born */
    countryOfBirthName?: Translated<string>

    /** The translated field position of the player */
    fieldPosition?: Translated<string>

    /** The translated field position of the player in the national team */
    nationalFieldPosition?: Translated<string>
  }
}

export interface Group {
  /** The unique identifier of the group */
  id: string

  /** The identifier of the competition to which the group belongs */
  competitionId: string

  /** The season year of the competition */
  seasonYear: string

  /** The type of the group */
  type: 'STANDARD' | 'VIRTUAL'

  /** The identifier of the round in the competition */
  roundId: string

  /** The order of the group in the competition */
  order: number

  metaData: {
    /** The name of the group */
    groupName: string

    /** The short name of the group */
    groupShortName: string
  }

  /** The phase of the competition */
  phase: 'TOURNAMENT' | 'QUALIFYING'

  /** The league of the group */
  league?: League

  /** The ids of the teams in the group */
  teams: string[]

  /** The number of teams that qualified from the group */
  teamsQualifiedNumber: number

  /** Translated versions of the group names */
  translations: {
    name: Translated<string>
    shortName: Translated<string>
  }
}

export interface League {
  /** The unique identifier of the league */
  id: string

  /** The identifier of the round in the competition */
  roundId: string

  /** The order of the league in the competition */
  order: number

  metaData: {
    /** The name of the league */
    leagueName: string

    /** The short name of the league */
    leagueShortName: string
  }

  /** Translated versions of the league names */
  translations: {
    name: string
    shortName: string
  }
}

export interface Leg {
  /** The number of the leg (1 for the first leg, 2 for the second leg) */
  number: number

  /** The start date and time of the leg */
  dateTimeFrom: Date

  /** The end date and time of the leg */
  dateTimeTo: Date

  /** Translated versions of the leg name */
  translations: {
    name: Translated<string>
  }
}

export interface Round {
  /** The unique identifier of the round */
  id: string

  /** The identifier of the competition to which the round belongs */
  competitionId: string

  /** The season year of the competition */
  seasonYear: string

  /** The order of the round in the competition */
  orderInCompetition: number

  /** Whether the round is active or not */
  active: boolean

  /** The status of the round */
  status: 'CURRENT' | 'UPCOMING' | 'FINISHED'

  /** The mode of the round */
  mode: 'GROUP' | 'KNOCK_OUT' | 'FINAL'

  /** Detailed information about the mode of the round */
  modeDetail: 'GROUP' | 'KNOCK_OUT_ONE_LEG' | 'KNOCK_OUT_TWO_LEGS'

  /** The number of groups in the round */
  groupCount: number

  /** Additional type information about the round */
  secondaryType?:
    | 'FINALS'
    | 'KNOCKOUT_PHASE'
    | 'GROUP_PHASE'
    | 'PLAYOFF'
    | 'QUALIFYING'
    | 'QUALIFYING_ROUND'
    | 'MAIN_ROUND'
    | 'FINAL_TOURNAMENT'

  metaData: {
    /** The name of the round */
    name: string

    /** The type of the round */
    type:
      | 'FINAL'
      | 'SEMIFINAL'
      | 'QUARTER_FINALS'
      | 'ROUND_OF_16'
      | 'GROUP_STANDINGS'
      | 'FINAL_TOURNAMENT_PLAY_OFF'
      | 'QUALIFYING'
      | 'REPLAY'
      | 'FIRST'
      | 'PRELIMINARY'
      | 'THIRD_PLAY_OFF'
      | 'INTERMEDIATE'
      | 'FIRST_QUALIFYING'
      | 'ELITE'
  }

  /** The phase of the round */
  phase: 'TOURNAMENT'

  /** The start date of the round in ISO 8601 format */
  dateFrom: string

  /** The end date of the round in ISO 8601 format */
  dateTo: string

  /** The number of teams in the round */
  teamCount: number

  /** The ids of the teams in the round */
  teams: string[]

  /** The type of the stadium name */
  stadiumNameType:
    | 'OFFICIAL_NAME'
    | 'MEDIA_NAME'
    | 'SPONSOR_NAME'
    | 'SPECIAL_EVENTS_NAME'

  /** The number of field players in the round */
  fieldPlayersCount: number

  /** The number of bench players in the round */
  benchPlayersCount: number

  /** The number of bench goalkeepers in the round */
  benchGKCount?: number

  /** The number of bench staff in the round */
  benchStaffCount?: number

  /** The number of substitutions in the round */
  substitutionCount?: number

  /** The bonus for the winner in coefficients */
  coefficientWinnerBonus?: number

  /** The id of the formula for the standings ranking in the round */
  standingsRankingFormulaId?: string

  /** Translated versions of the round names */
  translations: {
    abbreviation: Translated<string>
    name: Translated<string>
    shortName: Translated<string>
  }
}

export interface PlayerEvents {
  /** The players who scored penalties during the match */
  penaltyScorers?: MatchPenalty[]

  /** The players who missed penalties during the match */
  penaltiesMissed?: MatchPenalty[]

  /** The players who received red cards during the match */
  redCards?: MatchEvent[]

  /** The players who scored goals during the match */
  scorers?: MatchGoal[]
}

export interface MatchEvent {
  /** The unique identifier of the event */
  id: string

  /** The identifier of the team involved in the event */
  teamId: string

  /** The phase of the match when the event occurred */
  phase: MatchPhase

  /** The player involved in the event */
  player?: Player

  /** The time when the event occurred */
  time?: EventTime

  /** The provider of the team identifier */
  teamIdProvider: string

  images?: {
    /** URL to an image of the player celebrating */
    PLAYER_CELEBRATING: string
  } & Record<Uppercase<string>, string>
}

export interface EventTime {
  minute: number
  second?: number
  injuryMinute?: number
}

export interface MatchGoal extends MatchEvent {
  /** The type of the goal */
  goalType: 'SCORED' | 'PENALTY' | 'OWN'
}

export interface MatchPenalty extends MatchGoal {
  /** The result of the penalty */
  penaltyType: 'SCORED' | 'MISSED'
}

export type LineupStatus = 'NOT_AVAILABLE' | 'AVAILABLE' | 'TACTICAL_AVAILABLE'

export interface Lineup {
  /** The unique identifier of the match */
  matchId: string

  /** The status of the lineup */
  lineupStatus: LineupStatus

  /** The lineup for the home team */
  homeTeam: TeamLineup

  /** The lineup for the away team */
  awayTeam: TeamLineup
}

export interface TeamLineup {
  /** The team */
  team: Team

  /** The players on the field */
  field: PlayerField[]

  /** The players on the bench */
  bench: PlayerBench[]

  /** The coaches of the team */
  coaches: Coach[]

  /** The color of the team's shirt */
  shirtColor: string

  /** The URL to the image of the team's kit */
  kitImageUrl: string
}

export interface PlayerBench {
  /** The player */
  player: Player

  /** The type of the player */
  type: 'GOALKEEPER' | 'PLAYER' | 'CAPTAIN'

  /** The jersey number of the player */
  jerseyNumber: number

  /** Whether the player was a late update to the lineup */
  isLateUpdate: boolean
}

export interface PlayerField extends PlayerBench {
  /** The coordinates of the player on the field */
  fieldCoordinate: FieldCoordinate

  /** The coordinates of the player on the field for the FSP */
  fspFieldCoordinate: FieldCoordinate
}

export interface FieldCoordinate {
  /** The x-coordinate on the field */
  x: number

  /** The y-coordinate on the field */
  y: number
}

export interface Coach {
  /** The role of the coach */
  role: string

  /** The person acting as a coach */
  person: OfficialPerson

  /** URL to an image of the coach */
  imageUrl: string

  /** The translated role of the coach */
  translations: {
    role: Translated<string>
  }
}

export interface MatchEventDetails {
  /** The unique identifier of the event */
  id: string

  /** The identifier of the match where the event occurred */
  matchId: string

  /** The phase of the match when the event occurred */
  phase: MatchPhase

  /** The time when the event occurred */
  time: EventTime

  /** The timestamp of the event in ISO 8601 format */
  timestamp: string

  /** The type of the event */
  type: 'GOAL' | 'SUBSTITUTION' | 'YELLOW_CARD' | 'RED_CARD' | 'PENALTY'

  /** The subtype of the event */
  subType?: string

  /** Additional details about the event */
  detail?: string

  /** The primary actor involved in the event */
  primaryActor: EventActor

  /** The secondary actor involved in the event */
  secondaryActor?: EventActor

  /** The field position where the event occurred */
  fieldPosition?: FieldPosition

  /** The field position where the event occurred for the FSP */
  fspFieldPosition?: FieldPosition

  /** The body part involved in the event */
  bodyPart?: string

  /** The total score at the time of the event */
  totalScore?: ScoreResult
}

export interface EventActor {
  /** The player involved in the event */
  person?: Player

  /** The team involved in the event */
  team: Team

  /** The type of the actor */
  type: 'PLAYER' | string
}

export interface FieldPosition {
  /** The coordinates of the position on the field */
  coordinate: FieldCoordinate

  /** The distance from the goal */
  distance?: number
}

export interface Standings {
  /** The group in the competition */
  group: Group

  /** The round in the competition */
  round: Round

  /** The status of the standings */
  status: 'OFFICIAL' | string

  /** The list of team statistics in the standings */
  items: TeamStats[]
}

export interface TeamStats {
  /** The team */
  team: Team

  /** Whether the team has qualified or not */
  qualified: boolean

  /** The rank of the team in the standings */
  rank: number

  /** Whether a match of the team is live or not */
  isLive: boolean

  /** Whether the statistics are overridden or not */
  isOverridden: boolean

  /** The number of matches played by the team */
  played: number

  /** The number of matches won by the team */
  won: number

  /** The number of matches drawn by the team */
  drawn: number

  /** The number of matches lost by the team */
  lost: number

  /** The total points of the team */
  points: number

  /** The total goals scored by the team */
  goalsFor: number

  /** The total goals conceded by the team */
  goalsAgainst: number

  /** The goal difference of the team */
  goalDifference: number
}

export interface MatchStats {
  /** An array of statistics for the match */
  statistics: MatchStatistic[]

  /** The identifier of the team for which the statistics are provided */
  teamId: string
}

export interface MatchStatistic {
  /** The name of the statistic */
  name: string

  /** The value of the statistic */
  value: string

  /** The unit of the statistic value, if applicable */
  unit?: 'KILOMETER' | 'MINUTE' | 'KILOMETER_PER_HOUR' | string

  /** Additional attributes related to the statistic */
  attributes?: Record<string, string>

  /** Translated versions of the statistic name */
  translations: {
    name: Translated<string>
  }
}

export type Livescore = Pick<
  Match,
  | 'id'
  | 'fullTimeAt'
  | 'lineupStatus'
  | 'matchAttendance'
  | 'score'
  | 'status'
  | 'winner'
  | 'minute'
  | 'phase'
  | 'translations'
> & {
  /** A hash value calculated of all exposed match properties to quickly check for changes in the live score */
  hash: string
}
