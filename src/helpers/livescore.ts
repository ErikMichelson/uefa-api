import type { Livescore } from '../api'
import { apiLivescore } from '../constants'
import { performApiRequest } from '../utils'

/**
 * Fetches the current livescore from the API.
 * This includes upcoming matches in the near time, live matches and recent matches from the last hours.
 *
 * @returns A promise that resolves with the current livescore.
 */
export const getLivescore = (): Promise<Livescore[]> => {
  return performApiRequest<Livescore[]>(apiLivescore, {})
}
