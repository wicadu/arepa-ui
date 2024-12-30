import getObjectField from './getObjectField'

type GroupRecord<T> = Record<string, T[]>

/**
 * Groups an array of items by a specified nested field (using a string path).
 *
 * @param items - The array of items to group.
 * @param path - The path string representing the nested field to use for grouping.
 * @returns A record where each key is a unique value of the specified field,
 *          and the value is an array of items with that field value.
 */
function groupArrayByPath<T>(items: T[], path: string): GroupRecord<T> {
  return items.reduce((groups: GroupRecord<T>, item: T) => {
    const key = getObjectField(item, path)

    if (key === undefined || key === null) return groups

    if (!groups[key]) {
      groups[key] = []
    }

    groups[key].push(item)

    return groups
  }, {} as GroupRecord<T>)
}

export default groupArrayByPath
