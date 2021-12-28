import { rootReducer } from '../Redux/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
import {
  asyncIncrement,
  changeTheme,
  decrement,
  fetchData,
  increment,
} from '../Redux/actionsCreators'
import './styles.css'

const counter = document.querySelector('#counter')
const appendData = document.querySelector('#list')
const select = document.querySelector('#select')
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
)

document.addEventListener('click', (event) => {
  const $target = event.target.id
  switch ($target) {
    case 'add':
      return store.dispatch(increment())
    case 'sub':
      return store.dispatch(decrement())
    case 'async':
      return store.dispatch(asyncIncrement())
    case 'theme':
      const newTheme = document.body.classList.contains('light')
        ? 'dark'
        : 'light'
      return store.dispatch(changeTheme(newTheme))
    case 'fetch':
      appendData.innerHTML = ''
      let choose = select.value === 'users' ? 'users' : 'posts'
      return store.dispatch(fetchData(choose))
  }
})

store.subscribe(() => {
  const state = store.getState()

  counter.textContent = state.counter
  document.body.className = state.theme.value
  ;[sub, add, async, theme].forEach(
    (btn) => (btn.disabled = state.theme.disabled)
  )
  appendData.insertAdjacentHTML('afterbegin', render(state.fetch.data))
})

store.dispatch({ type: 'INIT' })

function render(data = []) {
  const list = (item) => {
    return `
   <li class="list-group-item">"${item.name || item.id}":  ${
      item.email || item.title
    }</li>
  `
  }
  return data.map(list).join('')
}
