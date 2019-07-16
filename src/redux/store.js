import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers/rootReducer'

const middleware = applyMiddleware(logger)

const store = createStore(rootReducer, middleware)

export {
    store
}


