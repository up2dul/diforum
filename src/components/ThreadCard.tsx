import { Link } from 'react-router-dom';
import { IconClock, IconHash, IconMessageDots, IconUser } from '@tabler/icons';

import { postedAt } from '@/utils';
import type { Thread } from '@/types';

type ThreadCardProps = Thread & {
  author: string;
};

const ThreadCard = ({
  id,
  title,
  body,
  totalComments,
  author,
  createdAt,
  category,
}: Partial<ThreadCardProps>) => (
  <Link to={`/detail/${id}`}>
    <article className='thread-card flex flex-col gap-5'>
      <h2>{title}</h2>
      <p className='max-h-6 truncate' dangerouslySetInnerHTML={{ __html: body as string }} />
      <hr />
      <div className='flex flex-wrap items-center justify-between gap-3 text-sm font-medium text-como-600'>
        <p>
          <IconMessageDots /> {totalComments}
        </p>
        <p>
          <IconUser /> {author}
        </p>
        <p>
          <IconClock /> {postedAt(createdAt as string)}
        </p>
        <p>
          <IconHash /> {category}
        </p>
      </div>
    </article>
  </Link>
);

export default ThreadCard;
