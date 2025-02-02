import { useMemo } from 'react'

export type Dataset = Record<string, string | number | boolean>

const useDataset = (datasets: Dataset = {}): Record<string, string> => {
  return useMemo(
    () =>
      Object.entries(datasets).reduce((prev, [key, value]) => {
        prev[key] = String(value)
        return prev
      }, {} as Record<string, string>),
    [datasets]
  )
}

export default useDataset
