import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IconCaretDown, IconCaretUp } from '@tabler/icons';

import { asyncReceiveThreadDetail } from '@/store/slice/thread-detail';
import { postedAt } from '@/utils';
import BackToHome from '@/components/BackToHome';
import type { AppDispatch, RootState } from '@/store';

const DetailThread = () => {
  const threadDetail = useSelector((state: RootState) => state.threadDetail.detail);
  const dispatch = useDispatch<AppDispatch>();
  const { threadId } = useParams();
  const { owner, createdAt, category, title, body } = threadDetail;

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId as string));
  }, [dispatch, threadId]);

  return (
    <>
      <BackToHome />
      <div className='mb-5 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <img src={owner.avatar} alt={`${owner.name}'s avatar`} className='w-11 rounded-full' />

          <div>
            <h3>{owner.name}</h3>
            <p className='text-sm'>
              #{category} <span className='font-semibold text-como-900'>•</span>{' '}
              {postedAt(createdAt)}
            </p>
          </div>
        </div>

        {/* <div className='flex flex-col items-center gap-1'>
          <button>
            <IconCaretUp />
          </button>

          <h2>12</h2>

          <button>
            <IconCaretDown />
          </button>
        </div> */}
      </div>

      <h1>{title}</h1>

      <hr className='my-5 border-como-300' />

      <p>{body}</p>
    </>
  );
};

export default DetailThread;
