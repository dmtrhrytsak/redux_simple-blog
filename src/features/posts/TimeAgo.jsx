import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
  const timeAgo = formatDistanceToNow(parseISO(timestamp));

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo} ago</i>
    </span>
  );
};

export default TimeAgo;
