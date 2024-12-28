import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import hexToRGBA from './hexToRGBA'
import isValidRun from './isValidRun'
import isBrowser from './isBrowser'
import isObjectEmpty from './isObjectEmpty'
import rutFormat from './rutFormat'
import debounce from './debounce'
import capitalize from './capitalize'
import formatCurrency from './formatCurrency'
// Todo: Everything has to be done throught chronos when migrating to @wicadu/utils
import chronos from './chronos'
import dateFormat from './chronos/dateFormat'
import getErrorMessage from './getErrorMessage'
import getObjectField from './getObjectField'
import getBordersStyles from './getBordersStyles'
import getFileSize from './getFileSize'
import localStorage from './localStorage'
import stringInterpolator from './stringInterpolator'
import isNumber from './isNumber'
import isObject from './isObject'
import groupItemsByPath from './groupItemsByPath'

yup.addMethod(yup.string, 'wicaduEmail', function validateEmail(message) {
  return this.matches(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`, {
    message,
    name: 'wicaduEmail',
    excludeEmptyString: true,
  }).transform((email) => `${email}`.toLowerCase())
})

export {
  yupResolver,
  yup,
  hexToRGBA,
  isValidRun,
  isBrowser,
  isObjectEmpty,
  rutFormat,
  debounce,
  capitalize,
  formatCurrency,
  chronos,
  dateFormat,
  getErrorMessage,
  getObjectField,
  getBordersStyles,
  getFileSize,
  localStorage,
  stringInterpolator,
  isNumber,
  isObject,
  groupItemsByPath,
}
