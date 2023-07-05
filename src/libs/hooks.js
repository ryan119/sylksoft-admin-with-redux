import axios from 'axios';
import { useEffect } from 'react'


export function useErrorLogger(message) {
  axios.post('/api/log/error', {message}).then(res => {
    //console.log('api log error: ', res)
    return true
  }).catch(err => {
    console.log('err: ', err)
  })
}

export function useInfoLogger(message) {
  useEffect(()=> {
    axios.post('/api/log/info', {message}).then(res => {
      //console.log('api log error: ', res)
    }).catch(err => {
      console.log('err: ', err)
    })
  },[])

  return true
}

export function useInfoLoggerInFunction(message) {
  axios.post('/api/log/info', {message}).then(res => {
    //console.log('api log error: ', res)
  }).catch(err => {
    console.log('err: ', err)
  })
}