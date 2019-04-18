/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { default as originalI18next } from 'i18next'
import LngDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-xhr-backend/dist/es/index.js'

export const i18next = originalI18next.use(LngDetector).use(Backend)

i18next.init({
  fallbackLng: 'en-US',
  debug: true,
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    prefix: '{',
    suffix: '}'
  },
  backend: {
    loadPath: '/assets/locales/{lng}.json'
  }
})
