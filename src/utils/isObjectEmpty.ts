export default function isObjectEmpty (object?: object) {
  return !object || Object.keys(object).length === 0
}
