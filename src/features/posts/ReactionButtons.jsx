import { useDispatch } from 'react-redux';

import { addReaction } from './posts.slice';

const reactionEmojis = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const onReactionAdd = (reaction) => {
    dispatch(addReaction({ postId: post.id, reaction }));
  };

  return (
    <div className="reaction-buttons">
      {Object.entries(reactionEmojis).map(([name, emoji]) => (
        <button
          key={name}
          type="button"
          className="reaction-button"
          onClick={() => onReactionAdd(name)}
        >
          {emoji} {post.reactions[name]}
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;
