import axios from 'axios';

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

export const fetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST,
  };
};

export const fetchPostsSuccess = (data) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: data,
  };
};

export const fetchPostsFailure = (error) => {
  return {
    type: FETCH_POSTS_FAILURE,
    error: error,
  };
};

export const fetchPostDetailsRequest = () => {
  return {
    type: FETCH_POST_DETAILS_REQUEST,
  };
};

export const fetchPostDetailsSuccess = (data) => {
  return {
    type: FETCH_POST_DETAILS_SUCCESS,
    payload: data,
  };
};

export const fetchPostDetailsFailure = (error) => {
  return {
    type: FETCH_POST_DETAILS_FAILURE,
    error: error,
  };
};

function deletePostSuccess() {
  return {
    type: DELETE_POST_SUCCESS,
  };
}

function deletePostFailure(error) {
  return {
    type: DELETE_POST_FAILURE,
    error: error,
  };
}

function updatePostSuccess() {
  return {
    type: UPDATE_POST_SUCCESS,
  };
}

function updatePostFailure(error) {
  return {
    type: UPDATE_POST_FAILURE,
    error: error,
  };
}

function getPostsListPromise() {
  return axios('https://jsonplaceholder.typicode.com/posts');
}

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    getPostsListPromise()
      .then((response) => dispatch(fetchPostsSuccess(response.data)))
      .catch((error) => dispatch(fetchPostsFailure(error.message)));
  };
};

export const fetchPostDetails = (id) => {
  return (dispatch) => {
    dispatch(fetchPostDetailsRequest());
    axios(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => dispatch(fetchPostDetailsSuccess(response.data)))
      .catch((error) => dispatch(fetchPostDetailsFailure(error.message)));
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        dispatch(deletePostSuccess());
      })
      .catch((error) => dispatch(deletePostFailure(error.message)));
  };
};

export const updatePost = (data) => {
  return (dispatch) => {
    const config = {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    };

    axios
      .put(
        `https://jsonplaceholder.typicode.com/posts/${data.id}`,
        JSON.stringify(data),
        config
      )
      .then((response) => dispatch(updatePostSuccess()))
      .catch((error) => dispatch(updatePostFailure(error.message)));
  };
};
