import { combineReducers } from 'redux-immutable'
import userReducer from '@xrengine/client-core/src/user/reducers'

const reducers = {
  ...userReducer
}

export default combineReducers(reducers)
