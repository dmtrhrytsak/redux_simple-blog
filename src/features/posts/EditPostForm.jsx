import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById, updatePost, deletePost } from './posts.slice';
import { useParams, useNavigate } from 'react-router-dom';

import { selectAllUsers } from '../users/users.slice';

const EditPostForm = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);

  const { status } = useSelector((state) => state.posts);
  const users = useSelector(selectAllUsers);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave =
    [title, content, userId].every(Boolean) && status !== 'loading';

  const onPostSave = async () => {
    if (!canSave) {
      return;
    }

    await dispatch(
      updatePost({
        id: post.id,
        title,
        body: content,
        userId,
        reactions: post.reactions,
      })
    ).unwrap();

    setTitle('');
    setContent('');
    setUserId('');

    navigate(`/posts/${postId}`);
  };

  const onPostDelete = async () => {
    await dispatch(deletePost(Number(postId))).unwrap();

    setTitle('');
    setContent('');
    setUserId('');

    navigate('/');
  };

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>Edit Post</h2>

      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
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
          onChange={onContentChanged}
        />

        <button type="button" onClick={onPostSave} disabled={!canSave}>
          Save Post
        </button>

        <button className="deleteButton" type="button" onClick={onPostDelete}>
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
