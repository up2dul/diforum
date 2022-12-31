import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { asyncPreloadProcess } from '@/store/slice/is-preload';
import {
  asyncAddThreadComment,
  asyncReceiveThreadDetail,
  asyncVoteThread,
} from '@/store/slice/thread-detail';
import { commentsCount, postedAt } from '@/utils';
import Button from '@/components/button/Button';
import CommentCard from '@/components/card/CommentCard';
import Tiptap from '@/components/form/Tiptap';
import VoteButton from '@/components/button/VoteButton';
import type { AppDispatch, RootState } from '@/store';
import type { Comment } from '@/types';

const DetailThread = () => {
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const threadDetail = useSelector((state: RootState) => state.threadDetail.detail);
  const dispatch = useDispatch<AppDispatch>();
  const { threadId } = useParams<'threadId'>();
  const [newComment, setNewComment] = useState<string>('');
  const { owner, createdAt, category, title, body, comments, upVotesBy, downVotesBy } =
    threadDetail;

  useEffect(() => {
    dispatch(asyncPreloadProcess());
    dispatch(asyncReceiveThreadDetail(threadId as string));
  }, [dispatch, threadId]);

  const handleUpVote = () => {
    dispatch(asyncVoteThread({ threadId: threadId as string, voteType: 'up-vote' }));
  };

  const handleDownVote = () => {
    dispatch(asyncVoteThread({ threadId: threadId as string, voteType: 'down-vote' }));
  };

  const handleNeutralVote = () => {
    dispatch(asyncVoteThread({ threadId: threadId as string, voteType: 'neutral-vote' }));
  };

  const handleNewComment = () => {
    dispatch(asyncAddThreadComment({ content: newComment, threadId: threadId as string }));
  };

  return (
    <>
      <Helmet>
        <title>{title || 'Thread'} | Diforum - Discussion and Forum App</title>
      </Helmet>

      <section className='mb-5 flex items-center gap-3'>
        <img src={owner.avatar} alt={`${owner.name}'s avatar`} className='w-11 rounded-full' />

        <div>
          <h3>{owner.name}</h3>
          <p className='text-sm'>
            #{category} <span className='font-medium text-como-900'>•</span> {postedAt(createdAt)}
          </p>
        </div>
      </section>

      <h1>{title}</h1>

      <hr className='my-3' />

      <p dangerouslySetInnerHTML={{ __html: body }} />

      <hr className='my-3' />

      <div className='mb-16 flex items-center justify-between'>
        <h3>{commentsCount(comments.length)}</h3>

        <div className='flex gap-8'>
          <VoteButton
            options={{
              voteFor: 'thread',
              voteType: 'up',
              isDisabled: !authUser,
              isVoted: upVotesBy.includes(authUser?.id as string),
            }}
            onVote={handleUpVote}
            onNeutral={handleNeutralVote}
          >
            {upVotesBy.length}
          </VoteButton>

          <VoteButton
            options={{
              voteFor: 'thread',
              voteType: 'down',
              isDisabled: !authUser,
              isVoted: downVotesBy.includes(authUser?.id as string),
            }}
            onVote={handleDownVote}
            onNeutral={handleNeutralVote}
          >
            {downVotesBy.length}
          </VoteButton>
        </div>
      </div>

      {authUser ? (
        <section className='flex flex-col justify-start gap-2'>
          <h3>Add your comment</h3>

          <Tiptap
            limitChar={280}
            placeholder='Max. 280 characters'
            onUpdate={(result) => setNewComment(result)}
          />

          <div className='self-end'>
            <Button onClick={handleNewComment}>Add comment</Button>
          </div>
        </section>
      ) : (
        <p>
          <Link to='/login' className='text-link'>
            Log in
          </Link>{' '}
          to add your comment
        </p>
      )}

      <hr className='my-5' />

      <section className='flex flex-col gap-3'>
        {comments?.map((comment: Comment) => (
          <CommentCard key={comment.id} {...comment} />
        ))}
      </section>
    </>
  );
};

export default DetailThread;
