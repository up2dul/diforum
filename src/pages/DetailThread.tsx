import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { IconArrowDown, IconArrowUp } from '@tabler/icons';

import { asyncReceiveThreadDetail } from '@/store/slice/thread-detail';
import { commentsCount, postedAt } from '@/utils';
import BackToHome from '@/components/BackToHome';
import CommentCard from '@/components/CommentCard';
import type { AppDispatch, RootState } from '@/store';
import type { Comment } from '@/types';

const DetailThread = () => {
  const threadDetail = useSelector((state: RootState) => state.threadDetail.detail);
  const dispatch = useDispatch<AppDispatch>();
  const { threadId } = useParams();
  const { owner, createdAt, category, title, body, comments, upVotesBy, downVotesBy } =
    threadDetail;

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId as string));
  }, [dispatch, threadId]);

  return (
    <>
      <BackToHome />
      <div className='mb-5 flex items-center gap-3'>
        <img src={owner.avatar} alt={`${owner.name}'s avatar`} className='w-11 rounded-full' />

        <div>
          <h3>{owner.name}</h3>
          <p className='text-sm'>
            #{category} <span className='font-semibold text-como-900'>•</span> {postedAt(createdAt)}
          </p>
        </div>
      </div>

      <h1>{title}</h1>

      <hr className='my-3' />

      <p dangerouslySetInnerHTML={{ __html: body }}></p>

      <hr className='my-3' />

      <div className='mb-16 flex items-center justify-between'>
        <h3>{commentsCount(comments.length)}</h3>

        <div className='flex gap-8'>
          <button type='button'>
            <IconArrowUp /> {upVotesBy.length}
          </button>

          <button type='button'>
            <IconArrowDown /> {downVotesBy.length}
          </button>
        </div>
      </div>

      <p>
        <Link to='/login' className='text-link'>
          Log in
        </Link>{' '}
        to add your comment
      </p>

      <hr className='my-3' />

      <div className='flex flex-col gap-3'>
        {comments?.map((comment: Comment) => (
          <CommentCard key={comment.id} {...comment} />
        ))}
      </div>
    </>
  );
};

export default DetailThread;
