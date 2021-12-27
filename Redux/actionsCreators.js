import {
  ASYNC_INCREMENT,
  CHANGE_THEME,
  DECREMENT,
  DISABLED,
  ENABLED,
  INCREMENT,
} from './types'

export function increment() {
  return {
    type: INCREMENT,
  }
}

export function decrement() {
  return {
    type: DECREMENT,
  }
}

export function asyncIncrement() {
  return function (dispatch) {
    dispatch(enabled())
    setTimeout(() => {
      dispatch({ type: ASYNC_INCREMENT })
      dispatch(disabled())
    }, 1500)
  }
}

export function changeTheme(newTheme) {
  return {
    type: CHANGE_THEME,
    payload: newTheme,
  }
}

export function enabled() {
  return {
    type: ENABLED,
    disabled: true,
  }
}
export function disabled() {
  return {
    type: DISABLED,
    disabled: false,
  }
}
