import type { Lineup, Match, MatchEventDetails, MatchStats } from '../api'
import { apiMatchStats, apiMatches } from '../constants'
import {
  parseOptionalMixedArray,
  performApiRequest,
  validateLimitOffset
} from '../utils'

export enum SortOrder {
  ASCENDING = 'ASC',
  DESCENDING = 'DESC'
}

interface FilterCriteria {
  competitionId?: string | number
  groupId?: string | number
  seasonYear?: string | number
  opponentTeamIds?: string | number | (string | number)[]
  order?: SortOrder
  matchId?: string | number | (string | number)[]
}

type Parameters = Record<
  keyof Partial<FilterCriteria> | 'limit' | 'offset' | 'order',
  string
>

/**
 * Get matches based on filter criteria
 * The API response is paginated by a limit and offset, except when filtering by match ids
 *
 * @param filter The criteria to filter matches by (match id, competition id, group id, opponent team ids, season year)
 * @param order Sort order of the matches
 * @param limit Maximum number of matches to return
 * @param offset Number of matches to skip
 * @returns Promise resolving to an array of matches
 */
export const getMatches = async (
  filter: FilterCriteria,
  order = SortOrder.ASCENDING,
  limit = 10,
  offset = 0
): Promise<Match[]> => {
  if (
    !filter ||
    (!filter.competitionId &&
      !filter.groupId &&
      !filter.opponentTeamIds &&
      !filter.matchId &&
      !filter.seasonYear)
  ) {
    throw new Error('At least one filter criteria must be provided')
  }

  if (filter.competitionId && !filter.seasonYear) {
    throw new Error(
      'Season year must be provided when filtering by competition id'
    )
  }

  validateLimitOffset(limit, offset)

  const parameters = {} as Parameters
  if (filter.competitionId) {
    parameters.competitionId = filter.competitionId.toString()
  }
  if (filter.matchId) {
    parameters.matchId = parseOptionalMixedArray(filter.matchId)
  }
  if (filter.opponentTeamIds) {
    parameters.opponentTeamIds = parseOptionalMixedArray(filter.opponentTeamIds)
  }
  if (filter.groupId) {
    parameters.groupId = filter.groupId.toString()
  }
  if (filter.seasonYear) {
    parameters.seasonYear = filter.seasonYear.toString()
  }
  if (!filter.matchId) {
    parameters.limit = limit.toString()
    parameters.offset = offset.toString()
  }
  parameters.order = order

  return performApiRequest<Match[]>(apiMatches, parameters)
}

/**
 * Get a single match by its id
 *
 * @param matchId The id of the match to retrieve
 * @returns Promise resolving to the match
 * @throws Error if the match is not found
 */
export const getMatch = async (matchId: string | number): Promise<Match> => {
  if (!matchId || matchId === '') {
    throw new Error('Match id must be provided')
  }
  const result = await getMatches({ matchId }, SortOrder.ASCENDING, 1, 0)
  if (result.length === 0) {
    throw new Error(`Match with id ${matchId} not found`)
  }
  return result[0]
}

/**
 * Get match statistics by match id
 *
 * @param matchId The id of the match to retrieve statistics for
 * @returns Promise resolving to the match statistics
 */
export const getMatchStats = async (
  matchId: string | number
): Promise<MatchStats[]> => {
  if (!matchId || matchId === '') {
    throw new Error('Match id must be provided')
  }
  return performApiRequest<MatchStats[]>(`${apiMatchStats}/${matchId}`, {})
}

/**
 * Get match events by match id
 *
 * @param matchId The id of the match to retrieve events for
 * @param order Sort order of the events
 * @param limit Maximum number of events to return
 * @param offset Number of events to skip
 * @returns Promise resolving to the match events
 */
export const getMatchEvents = async (
  matchId: string | number,
  order = SortOrder.ASCENDING,
  limit = 10,
  offset = 0
): Promise<MatchEventDetails[]> => {
  if (!matchId || matchId === '') {
    throw new Error('Match id must be provided')
  }
  return performApiRequest<MatchEventDetails[]>(
    `${apiMatches}/${matchId}/events`,
    {
      filter: 'LINEUP', // get everything after the lineup
      order,
      limit: limit.toString(),
      offset: offset.toString()
    }
  )
}

/**
 * Get lineups by match id
 *
 * @param matchId The id of the match to retrieve lineups for
 * @returns Promise resolving to the lineups
 */
export const getLineups = async (matchId: string | number): Promise<Lineup> => {
  if (!matchId || matchId === '') {
    throw new Error('Match id must be provided')
  }
  return performApiRequest<Lineup>(`${apiMatches}/${matchId}/lineups`, {})
}
