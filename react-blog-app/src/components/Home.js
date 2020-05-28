import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { fetchPosts, deletePost, updatePost } from '../redux/index';
import './Home.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement(document.getElementById('root'));

const Home = React.memo(() => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  let history = useHistory();
  const [modalIsOpen, setModalState] = useState(false);
  const [updateFields, setUpdateFields] = useState({
    id: null,
    userId: null,
    title: '',
    body: '',
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [posts.isPostDeleted, posts.isPostUpdated]);

  useEffect(() => {
    closeModal();
  }, [posts.isPostUpdated, posts.updatePostError]);

  const handleDeletePost = (e) => {
    dispatch(deletePost(e.target.getAttribute('data-id')));
  };

  function updatePostHandler(event) {
    event.preventDefault();
    dispatch(updatePost(updateFields));
  }

  const closeModal = () => {
    setModalState(false);
  };

  const openUpdateModal = (event) => {
    setModalState(true);
    setUpdateFields({
      ...updateFields,
      id: Number(event.target.getAttribute('data-id')),
      userId: Number(event.target.getAttribute('data-userId')),
      title: event.target.getAttribute('data-title'),
      body: event.target.getAttribute('data-body'),
    });
  };

  return (
    <div>
      {posts.deleteError ? (
        <h2 className='error'>{posts.deleteError}</h2>
      ) : posts.updatePostError ? (
        <h2 className='error'>{posts.updatePostError}</h2>
      ) : (
        ''
      )}
      {posts.isLoading ? (
        <p>Loading ...</p>
      ) : posts.error ? (
        <>{posts.error}</>
      ) : (
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th scope='col'>Id</th>
              <th scope='col'>Title</th>
              <th scope='col'>Details</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts &&
              posts.posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>
                    <button
                      className='btn btn-info'
                      data-id={post.id}
                      onClick={() => history.push(`/details/${post.id}`)}
                    >
                      Details
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-primary '
                      data-id={post.id}
                      data-body={post.body}
                      data-userid={post.userId}
                      data-title={post.title}
                      onClick={openUpdateModal}
                    >
                      Update
                    </button>
                    <button
                      className='btn btn-danger'
                      data-id={post.id}
                      onClick={handleDeletePost}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <Modal isOpen={modalIsOpen} style={customStyles}>
        <button onClick={closeModal}>close</button>
        <form onSubmit={updatePostHandler}>
          <strong>id: {updateFields.id}</strong>

          <div className='form-group'>
            <label htmlFor='exampleFormControlInput1'>Title</label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              value={updateFields.title}
              onChange={(e) =>
                setUpdateFields({ ...updateFields, title: e.target.value })
              }
            />
          </div>

          <div className='form-group'>
            <label htmlFor='exampleFormControlTextarea1'>Body</label>
            <textarea
              className='form-control'
              id='exampleFormControlTextarea1'
              rows='3'
              onChange={(e) =>
                setUpdateFields({ ...updateFields, body: e.target.value })
              }
              value={updateFields.body}
            >
              {updateFields.body}
            </textarea>
          </div>
          <button type='submit' className='btn btn-primary mb-2'>
            Update
          </button>
        </form>
      </Modal>
    </div>
  );
});

export default Home;
