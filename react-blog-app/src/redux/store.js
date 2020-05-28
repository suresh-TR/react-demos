import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { postReducer } from './posts/postReducer';

export const store = createStore(
  combineReducers({
    posts: postReducer,
  }),
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
