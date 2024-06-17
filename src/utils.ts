import type { ApiErrorResponse } from './api'

export const performApiRequest = async <ResultType>(
  apiUrl: string,
  parameters: Record<string, string>
): Promise<ResultType> => {
  const query = new URLSearchParams(parameters).toString()
  const response = await fetch(`${apiUrl}?${query}`)
  if (!response.ok) {
    throw new Error(`Could not fetch data from API (HTTP ${response.status})`)
  }
  const json = (await response.json()) as ApiErrorResponse
  if (json.error !== undefined) {
    throw new Error(
      `API returned an error: ${json.error.title}, ${json.error.message}`
    )
  }
  return json as ResultType
}

export const parseOptionalMixedArray = (
  mixed: string | number | (string | number)[] | undefined
): string | undefined => {
  if (mixed === undefined) {
    return undefined
  }
  if (Array.isArray(mixed)) {
    return mixed.join(',')
  }
  return mixed.toString()
}

export const validateLimitOffset = (limit: number, offset: number): void => {
  if (limit < 1) {
    throw new Error('Limit must be greater than 0')
  }

  if (offset < 0) {
    throw new Error('Offset must be greater than or equal to 0')
  }
}
