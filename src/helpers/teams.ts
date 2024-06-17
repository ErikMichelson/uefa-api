import type { Team } from '../api'
import { apiTeams } from '../constants'
import {
  parseOptionalMixedArray,
  performApiRequest,
  validateLimitOffset
} from '../utils'

interface FilterCriteria {
  competitionId?: string | number
  roundIds?: string | number | (string | number)[]
  teamIds?: string | number | (string | number)[]
  associationId?: string | number
  seasonYear?: string | number
}

type Parameters = Record<
  keyof Partial<FilterCriteria> | 'limit' | 'offset',
  string
>

/**
 * Get team details based on filter criteria
 * The API response is paginated by a limit and offset, except when filtering by team ids
 *
 * @param filter The criteria to filter teams by (competition id, round ids, team ids, association id, season year)
 * @param limit Maximum number of teams to return
 * @param offset Number of teams to skip
 * @returns Promise resolving to an array of teams
 */
export const getTeams = async (
  filter: FilterCriteria,
  limit = 10,
  offset = 0
): Promise<Team[]> => {
  if (
    !filter ||
    (!filter.competitionId &&
      !filter.roundIds &&
      !filter.teamIds &&
      !filter.associationId &&
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
  if (filter.roundIds) {
    parameters.roundIds = parseOptionalMixedArray(filter.roundIds)
  }
  if (filter.teamIds) {
    parameters.teamIds = parseOptionalMixedArray(filter.teamIds)
  }
  if (filter.associationId) {
    parameters.associationId = filter.associationId.toString()
  }
  if (filter.seasonYear) {
    parameters.seasonYear = filter.seasonYear.toString()
  }
  if (!filter.teamIds) {
    parameters.limit = limit.toString()
    parameters.offset = offset.toString()
  }

  return performApiRequest<Team[]>(apiTeams, parameters)
}

/**
 * Get team details based on team id
 *
 * @param teamId The id of the team to get details for
 * @returns Promise resolving to a team
 * @throws Error if no team is found for the provided id
 */
export const getTeam = async (teamId: number | string): Promise<Team> => {
  if (!teamId) {
    throw new Error('Team id must be provided')
  }

  const result = await performApiRequest<Team[]>(apiTeams, {
    teamIds: String(teamId),
    limit: '1',
    offset: '0'
  })
  if (result.length !== 1) {
    throw new Error(`No team found for id ${teamId}`)
  }
  return result[0]
}
