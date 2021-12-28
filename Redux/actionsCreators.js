import {
  ASYNC_INCREMENT,
  CHANGE_THEME,
  DECREMENT,
  DISABLED,
  ENABLED,
  FETCH,
  INCREMENT,
} from './types'
const URL = (details) => `https://jsonplaceholder.typicode.com/${details}/`

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

export function fetchData(select) {
  return function (dispatch) {
    fetch(URL(select))
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: FETCH,
          payload: data,
        })
      )
  }
}
