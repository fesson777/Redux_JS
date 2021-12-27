import { rootReducer } from '../Redux/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
import {
  asyncIncrement,
  changeTheme,
  decrement,
  increment,
} from '../Redux/actionsCreators'
import './styles.css'

const counter = document.querySelector('#counter')
const sub = document.querySelector('#sub')
const add = document.querySelector('#add')
const async = document.querySelector('#async')
const theme = document.querySelector('#theme')

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
)

add.addEventListener('click', () => {
  store.dispatch(increment())
})

sub.addEventListener('click', () => {
  store.dispatch(decrement())
})

async.addEventListener('click', () => {
  store.dispatch(asyncIncrement())
})

theme.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light') ? 'dark' : 'light'
  store.dispatch(changeTheme(newTheme))
})

store.subscribe(() => {
  const state = store.getState()

  counter.textContent = state.counter
  document.body.className = state.theme.value
  ;[sub, add, async, theme].forEach(
    (btn) => (btn.disabled = state.theme.disabled)
  )
})

store.dispatch({ type: 'INIT' })
