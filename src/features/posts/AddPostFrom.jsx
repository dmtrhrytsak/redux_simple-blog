import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addPost } from './posts.slice';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const { users, status } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && status === 'idle';

  const onPostSave = async () => {
    if (!canSave) {
      return;
    }

    await dispatch(addPost({ title, body: content, userId })).unwrap();

    setTitle('');
    setContent('');
    setUserId('');

    navigate('/');
  };

  return (
    <section>
      <h2>Add a new post</h2>

      <form>
        <label htmlFor="postTitle">Post title:</label>
        <input
          id="postTitle"
          type="text"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          name="postAuthor"
          value={userId}
          onChange={onAuthorChange}
        >
          <option value="" />
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />

        <button
          type="button"
          onClick={onPostSave}
          disabled={!canSave}
          className="save-btn"
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
