import logger from '../../../src/libs/winston-logger'

export default async function handler(req, res) {
  logger.error(req.body)
  res.status(200).json('OK')
}


