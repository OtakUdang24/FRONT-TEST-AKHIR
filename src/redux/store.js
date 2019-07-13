import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import quiz from './reducers/quizReducer'

const middleware = applyMiddleware(logger)

const store = createStore(quiz, middleware)

export {
    store
}


