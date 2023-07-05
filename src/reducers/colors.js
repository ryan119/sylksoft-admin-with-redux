import { fromJS } from 'immutable'
import { createReducer } from './index';

const initialState = fromJS([
  'transparent',
  'black',
  'white',
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink'
])


const handlers = {

}

export default createReducer(initialState, handlers)
