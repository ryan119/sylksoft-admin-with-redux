import moment from 'moment'

const Date_Pattern_Dash = "YYYY-MM-DD"
const Date_Pattern_Slash = "YYYY/MM/DD"
const Datetime_Pattern_Dash = "YYYY-MM-DD HH:mm:ss"
const Datetime_Pattern_Slash = "YYYY/MM/DD HH:mm:ss"

export function formatDatePatternDash(value) {
  if(value){
    return moment(value).format(Date_Pattern_Dash)
  }else {
    return ''
  }
}

export function formatDatetimePatternDash(value) {
  if(value) {
    return moment(value).format(Datetime_Pattern_Dash)
  }else {
    return ''
  }
}

export function formatDatePatternSlash(value) {
  if(value){
    return moment(value).format(Date_Pattern_Slash)
  }else {
    return ''
  }
}

export function formatDatetimePatternSlash(value) {
  if(value) {
    return moment(value).format(Datetime_Pattern_Slash)
  }else {
    return ''
  }
}

// get last month format
export function getLastMonthFormat() {
  return moment().subtract(1, 'months').format(Date_Pattern_Dash)
}
export function getNumOfPastYearsFormat(num) {
  return moment().subtract(num, 'years').format(Date_Pattern_Dash)
}
export function getCurrentTime() {
  return moment().set({h:23,m:59, s:59})
}


