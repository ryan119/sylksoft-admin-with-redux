const { format } = require('winston')
const fs = require('fs')
const winston = require('winston')
const moment = require('moment')
const { combine, timestamp, label, printf, prettyPrint, colorize } = winston.format;
require('winston-daily-rotate-file')


const colors= {
  error: 'red',
  info: 'blue',
  warn: '#ff9966',
}


const timezoned = () => {
  return new Date().toLocaleString('zh-TW', {
    timeZone: 'Asia/Taipei',
    hour12:false
  });
}

const errorTransport = new winston.transports.DailyRotateFile({
  level:'error',
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
})

const infoTransport = new winston.transports.DailyRotateFile({
  level:'info',
  filename: 'logs/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
})

const colorizer = winston.format.colorize();

const myFormat = format.combine(
  label({label: 'MXMT'}),
  timestamp({format: timezoned}),
  printf(({ level, message, label, timestamp }) => {
     return colorizer.colorize(level, `[${label}] ${timestamp} ${level}: ${message}`)
  })
)
/*
const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `[${label}] ${timestamp} ${level}: ${message}`;
});*/

const logger = winston.createLogger({
  level: 'info',
  format: myFormat ,
  /*format: combine(
    format.colorize({all:true}),
    label({label: 'Whisky Liff'}),
    format.timestamp({format: timezoned}),
    myFormat
  ),*/
  transports: [
    errorTransport,
    infoTransport,
    new winston.transports.File({filename: 'logs/combined.log'})
  ]
})

if(process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console())
}

export default logger
