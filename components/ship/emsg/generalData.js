import { faker } from '@faker-js/faker'
import moment from 'moment'

export const messagesList = []

export const createMessageList = () => {
  return {
    sid: faker.random.numeric(4),
    subject: faker.internet.userName(),
    sender: faker.internet.email(),
    receiveDate: faker.date.between(moment('2019-01-01').toDate(),moment('2022-11-01').toDate() ),
  }
}

export const createAttachmentList = () => {
  return {
    sid: faker.random.numeric(4),
    subject: faker.internet.userName(),
    attachment: `${faker.random.words(1)}.pdf`,
    sender: faker.internet.email(),
    receiveDate: faker.date.between(moment('2019-01-01').toDate(),moment('2022-11-01').toDate() ),
  }
}

export const createTradeList = () => {
  return {
    tid: faker.random.numeric(4),
    soldPrice: faker.random.numeric(8),
    soldDate: faker.date.past(),
    creator: faker.name.lastName(),
    createTime: faker.date.birthdate()
  }
}

export const createValuationList = () => {
  return {
    vid: faker.random.numeric(4),
    estValuation: faker.random.numeric(8),
    valuationDate: faker.date.past(),
    creator: faker.name.lastName(),
    createTime: faker.date.birthdate()
  }
}

export const searchShipData = () => {
  return [
    { id: '1', type: 'B/C', shipName: 'JAPAN' },
    { id: '2', type: 'PAX', shipName: 'JAPAN' },
    { id: '3', type: 'DEMO.', shipName: 'NORWAY' },
    { id: '4', type: 'RO-RO', shipName: 'SINGAPORE' }
  ]
}
