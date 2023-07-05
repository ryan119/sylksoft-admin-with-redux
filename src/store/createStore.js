import Immutable from 'immutable'
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import {applyMiddleware, compose, legacy_createStore as createStore, combineReducers} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension"
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {instance, setupAxiosInterceptor} from './axios'
import Router from 'next/router'

import rootReducer from '../reducers'

function createMiddlewares() {
    const middlewares = []

    if (process.env.MODE === 'development' && typeof window !== 'undefined') {
        middlewares.push(createLogger({
            level: 'info',
            collapsed: true,
            stateTransformer: (state) => {
                const newState = {}

                for (const i of Object.keys(state)) {
                    if (Immutable.Iterable.isIterable(state[i])) {
                        newState[i] = state[i].toJS()
                    } else {
                        newState[i] = state[i]
                    }
                }

                return newState
            }
        }))
    }

    return middlewares
}

function immutableChildren(obj) {
    const state = {}
    Object.keys(obj).forEach((key) => {
        state[key] = Immutable.fromJS(obj[key])
    })
    return state
}

const reducer = (state, action) => {
    //console.log('state: ', state, 'action', action)
    /*if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        //console.log('nextState', nextState)
        return immutableChildren(nextState)
    } else {
        return rootReducer(state, action)
    }*/
    return rootReducer(state, action)
}

const create = (context) => {
    //console.log('context: ', context)
    const middlewares = createMiddlewares()
    instance.defaults.timeout = 3000000
    let store

    if (process.env.MODE === 'production' ) {
        store = createStore(
          reducer,
          compose(applyMiddleware(thunkMiddleware.withExtraArgument(instance), ...middlewares))
        )
    } else {
        store = createStore(
          reducer,
          compose(
            composeWithDevTools(
              applyMiddleware(thunkMiddleware.withExtraArgument(instance), ...middlewares))
          )
        )
    }
    //console.log('store:', store)
    setupAxiosInterceptor(store, instance, Router)

    return store
}


export const wrapper = createWrapper(create, {debug: false})
