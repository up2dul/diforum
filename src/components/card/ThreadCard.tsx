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

      <div className='flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px] font-medium text-como-600 sm:text-[12px] lg:text-sm'>
        <p>
          <IconMessageDots /> {totalComments}
        </p>
        <p>
          <IconUser /> {author}
        </p>

        <div className='w-full lg:hidden' />

        <p>
          <IconClock /> <time dateTime={createdAt}>{postedAt(createdAt as string)}</time>
        </p>
        <p>
          <IconHash /> {category}
        </p>
      </div>
    </article>
  </Link>
);

export default ThreadCard;
