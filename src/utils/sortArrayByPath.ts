import getObjectField from './getObjectField'

/**
 * Sorts an array of items by a specified nested field (using a string path).
 *
 * @param items - The array of items to sort.
 * @param path - The path string representing the nested field to use for sorting.
 * @param ascending - Whether to sort in ascending order (default is true).
 * @returns A new array of items sorted by the specified field.
 */
function sortArrayByPath<T>(
  items: T[],
  path: string,
  ascending: boolean = true
): T[] {
  return [...(items || [])].sort((a, b) => {
    const valueA = getObjectField(a, path)
    const valueB = getObjectField(b, path)

    if (valueA === undefined || valueB === undefined) return 0

    if (valueA < valueB) return ascending ? -1 : 1
    if (valueA > valueB) return ascending ? 1 : -1

    return 0
  })
}

export default sortArrayByPath
