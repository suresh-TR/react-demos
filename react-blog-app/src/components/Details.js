import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchPostDetails } from '../redux/index';

const Details = () => {
  let { id } = useParams();
  let history = useHistory();
  let post = useSelector((state) => state.posts);
  let dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(post.postDetails).length === 0) {
      dispatch(fetchPostDetails(id));
    }
  }, [id]);

  return (
    <div>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Title</th>
            <th scope='col'>Details</th>
          </tr>
        </thead>
        <tbody>
          {post.isLoading ? (
            <tr>
              <td colSpan='3'>Loading...</td>
            </tr>
          ) : post.error ? (
            <tr>
              <td colSpan='3' className='error'>
                {post.error}
              </td>
            </tr>
          ) : (
            post &&
            post.postDetails && (
              <tr key={post.postDetails.id}>
                <td>{post.postDetails.id}</td>
                <td>{post.postDetails.title}</td>
                <td>{post.postDetails.body}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <p>
        <button className='btn btn-secondary' onClick={() => history.push('/')}>
          Go Back
        </button>
      </p>
    </div>
  );
};

export default Details;
