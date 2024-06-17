import type { Standings } from '../api'
import { apiStandings } from '../constants'
import { parseOptionalMixedArray, performApiRequest } from '../utils'

interface FilterCriteria {
  competitionId?: string | number
  roundId?: string | number
  groupIds?: string | number | (string | number)[]
  phase?: string
  seasonYear?: string | number
}

type Parameters = Record<keyof Partial<FilterCriteria>, string>

/**
 * Get standings based on filter criteria
 *
 * @param filter The criteria to filter standings by (competition id, round id, group ids, phase, season year)
 * @returns Promise resolving to an array of standings
 */
export const getStandings = async (
  filter: FilterCriteria
): Promise<Standings[]> => {
  if (
    !filter ||
    (!filter.competitionId &&
      !filter.roundId &&
      !filter.groupIds &&
      !filter.phase &&
      !filter.seasonYear)
  ) {
    throw new Error('At least one filter criteria must be provided')
  }

  if (filter.competitionId && !filter.seasonYear) {
    throw new Error(
      'Season year must be provided when filtering by competition id'
    )
  }

  const parameters = {} as Parameters
  if (filter.competitionId) {
    parameters.competitionId = filter.competitionId.toString()
  }
  if (filter.roundId) {
    parameters.roundId = parseOptionalMixedArray(filter.roundId)
  }
  if (filter.groupIds) {
    parameters.groupIds = parseOptionalMixedArray(filter.groupIds)
  }
  if (filter.phase) {
    parameters.phase = filter.phase.toString()
  }
  if (filter.seasonYear) {
    parameters.seasonYear = filter.seasonYear.toString()
  }

  return performApiRequest<Standings[]>(apiStandings, parameters)
}
