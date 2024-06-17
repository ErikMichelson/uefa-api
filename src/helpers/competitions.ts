import type { Competition } from '../api'
import { apiCompetitions } from '../constants'
import { parseOptionalMixedArray, performApiRequest } from '../utils'

/**
 * Returns a list of UEFA competitions, optional matching the provided competition ids
 *
 * @param filterByIds A single competition id, an array of competition ids or undefined to return all competitions
 * @returns A promise that resolves to a list of competitions
 */
export const getCompetitions = (
  filterByIds?: number | string | (string | number)[]
): Promise<Competition[]> => {
  const competitionIds = parseOptionalMixedArray(filterByIds)
  const filter = competitionIds ? { competitionIds } : {}
  return performApiRequest<Competition[]>(apiCompetitions, filter)
}
