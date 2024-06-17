import type { Player } from '../api'
import { apiPlayers } from '../constants'
import {
  parseOptionalMixedArray,
  performApiRequest,
  validateLimitOffset
} from '../utils'

interface FilterCriteria {
  competitionId?: string | number
  playerIds?: string | number | (string | number)[]
  seasonYear?: string | number
}

type Parameters = Record<
  keyof (Partial<FilterCriteria> & Partial<{ limit: string; offset: string }>),
  string
>

/**
 * Get player details based on filter criteria
 * The API response is paginated by a limit and offset, except when filtering by player ids
 *
 * @param filter The criteria to filter players by (competition id, player ids, season year)
 * @param limit Maximum number of players to return
 * @param offset Number of players to skip
 * @returns Promise resolving to an array of players
 */
export const getPlayers = async (
  filter: FilterCriteria,
  limit = 10,
  offset = 0
): Promise<Player[]> => {
  if (
    !filter ||
    (!filter.competitionId && !filter.playerIds && !filter.seasonYear)
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
  if (filter.playerIds) {
    parameters.playerIds = parseOptionalMixedArray(filter.playerIds)
  }
  if (filter.seasonYear) {
    parameters.seasonYear = filter.seasonYear.toString()
  }
  if (!filter.playerIds) {
    parameters.limit = limit.toString()
    parameters.offset = offset.toString()
  }

  return performApiRequest<Player[]>(apiPlayers, parameters)
}
