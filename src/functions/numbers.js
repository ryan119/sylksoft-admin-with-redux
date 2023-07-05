import accounting from 'accounting'
import { isEmpty, isNumber } from 'lodash'

export function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function formatPercent(percent) {
  return `${accounting
    .formatMoney(percent, '', 1, ',', '.')
    .replace(/\.00$/g, '')}%`
}

export function formatCurrency(value) {
  return accounting.formatMoney(value, '$', 2, ',', '.').replace(/\.00$/g, '')
}

export function formatNumber(value) {
  if(!value) {
    return 'N/A'
  }else {
    return accounting.formatMoney(value, '', 2, ',', '.').replace(/\.00$/g, '')
  }
}

export function formatMillion(value) {
  if(isNumber(value)) {
    return value/100000
  }else {
    return ''
  }
}

export function formatInt(value) {
  const parsed = parseInt(value)
  if(isNaN(parsed)) {
    return 0
  }
  return parsed
}
