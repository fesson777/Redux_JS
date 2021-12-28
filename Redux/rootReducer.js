import { combineReducers } from 'redux'

import {
  ASYNC_INCREMENT,
  CHANGE_THEME,
  DECREMENT,
  DISABLED,
  ENABLED,
  FETCH,
  INCREMENT,
} from './types'

function counterReducer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1

    case DECREMENT:
      return state - 1

    case ASYNC_INCREMENT:
      return state + 5

    default:
      return state
  }
}
const initialState = {
  value: 'light',
  disabled: false,
}

function themeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, value: action.payload }
    case DISABLED:
      return { ...state, disabled: false }
    case ENABLED:
      return { ...state, disabled: true }
    default:
      return state
  }
}

function fetchReducer(state = {}, action) {
  switch (action.type) {
    case FETCH:
      return { ...state, data: action.payload }
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer,
  fetch: fetchReducer,
})
