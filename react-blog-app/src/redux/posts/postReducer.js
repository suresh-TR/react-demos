import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POST_DETAILS_REQUEST,
  FETCH_POST_DETAILS_SUCCESS,
  FETCH_POST_DETAILS_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
} from './postTypes';

const initialState = {
  isLoading: false,
  posts: [],
  error: '',
  postDetails: {},
  isPostDeleted: false,
  deleteError: '',
  isPostUpdated: false,
  updatePostError: '',
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
        error: '',
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        posts: [],
        error: action.error,
      };
    case FETCH_POST_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_POST_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        postDetails: action.payload,
        error: '',
      };
    case FETCH_POST_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: false,
        postDetails: {},
        error: action.error,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isPostDeleted: true,
        error: '',
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isPostDeleted: false,
        deleteError: action.error,
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        isPostUpdated: true,
        updatePostError: '',
      };
    case UPDATE_POST_FAILURE:
      return {
        ...state,
        isPostUpdated: false,
        updatePostError: action.error,
      };
    default:
      return state;
  }
};
