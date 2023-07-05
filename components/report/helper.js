import { forEach, map } from 'lodash'
import React from 'react'
import { alertWarningMessage } from 'src/functions/page-alert'

export function convertDatasets(spDataset) {
  const datasets = []
  const labels = map(spDataset[0]?.data, (spd, idx) => spd.date)
  forEach(spDataset, (spd, idx) => {
    const prices = map(spDataset[idx].data, (i, idx) => i.price)
    const tmp = {
      label: `查詢結果0${idx + 1}`,
      data: prices,
      borderColor: getColor(idx),
      backgroundColor: 'rgb(255,255,255)',
      fill:false,
      spanGaps: true,
    }
    datasets.push(tmp)
  })

  const transData = {
    labels,
    datasets
  }

  //console.log('transData: ', transData)
  return transData
}

function getColor(key) {
  const color = {
    '0': 'rgb(234,8,42)',
    '1': 'rgb(248,135,63)',
    '2': 'rgb(236,205,8)',
    '3': 'rgb(62,218,27)',
    '4': 'rgb(25,187,236)'
  }
  return color[key]
}


export const checkDate = function({ dateStart, dateEnd, frequency }) {
  if ((!dateStart && !dateEnd) || !frequency) {
    return alertWarningMessage('請指定時間區間及Frequency')
  } else {
    return 'next'
  }
}

export const checkOther = function({ type, dwtMin, dwtMax, age, builtCountry, teuStart, teuEnd }) {
  if (!type && !dwtMin && !dwtMax && !age && !builtCountry && !teuStart && !teuEnd) {
    return alertWarningMessage('請先選取任一條件')
  } else {
    return 'next'
  }
}
export const checkdwt = function({ type, dwtId, age, builtCountry, teuId }) {
  if (!type && !dwtId && !age && !builtCountry && !teuId) {
    return alertWarningMessage('請先選取任一條件')
  } else {
    return 'next'
  }
}


//簡單的Chain of Responsibility
export const Chain = function(fn) {
  this.fn = fn
  this.next = null
}

Chain.prototype.setNext = function(next) {
  return this.next = next
}

Chain.prototype.passRequest = function() {
  const ret = this.fn.apply(this, arguments)

  if (ret === 'next') {
    return this.next && this.next.passRequest.apply(this.next, arguments)
  }
  return ret
}

Function.prototype.after = function(fn) {
  const _self = this
  return function() {
    const ret = _self.apply(this, arguments)
    if (ret === 'next') {
      return fn.apply(this, arguments)
    }
    return ret
  }
}
