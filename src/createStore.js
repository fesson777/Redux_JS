export function createStore(rootReducer, initialState) {
  let state = rootReducer(initialState, { type: 'INIT' })
  let listeners = []

  return {
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach((listener) => listener())
    },
    subscribe(callback) {
      listeners.push(callback)
    },
    getState() {
      return state
    },
  }
}
