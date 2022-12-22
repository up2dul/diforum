import { IconArrowDown, IconArrowUp } from '@tabler/icons';

import { postedAt } from '@/utils';
import type { Comment as CommentCardProps } from '@/types';

const CommentCard = ({ owner, createdAt, content, upVotesBy, downVotesBy }: CommentCardProps) => (
  <article className='flex flex-col gap-4 rounded-lg border border-como-600 p-4'>
    <div className='flex items-center gap-3'>
      <img src={owner.avatar} alt={`${owner.name}'s avatar`} className='w-8 rounded-full' />

      <h3>{owner.name}</h3>
    </div>

    <p dangerouslySetInnerHTML={{ __html: content }}></p>

    <div className='flex items-center justify-between'>
      <h3 className='text-sm'>{postedAt(createdAt)}</h3>
      <div className='flex gap-8'>
        <button type='button'>
          <IconArrowUp /> {upVotesBy.length}
        </button>

        <button type='button'>
          <IconArrowDown /> {downVotesBy.length}
        </button>
      </div>
    </div>
  </article>
);

export default CommentCard;
