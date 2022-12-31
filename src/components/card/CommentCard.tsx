import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { asyncVoteComment } from '@/store/slice/thread-detail';
import { postedAt } from '@/utils';
import VoteButton from '../button/VoteButton';
import type { Comment as CommentCardProps } from '@/types';
import type { AppDispatch, RootState } from '@/store';

const CommentCard = ({
  id: commentId,
  owner,
  createdAt,
  content,
  upVotesBy,
  downVotesBy,
}: CommentCardProps) => {
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const dispatch = useDispatch<AppDispatch>();
  const { threadId } = useParams<'threadId'>();

  const handleUpVote = () => {
    dispatch(asyncVoteComment({ threadId: threadId as string, commentId, voteType: 'up-vote' }));
  };

  const handleDownVote = () => {
    dispatch(asyncVoteComment({ threadId: threadId as string, commentId, voteType: 'down-vote' }));
  };

  const handleNeutralVote = () => {
    dispatch(
      asyncVoteComment({ threadId: threadId as string, commentId, voteType: 'neutral-vote' }),
    );
  };

  return (
    <article className='flex flex-col gap-4 rounded-lg border border-como-600 p-4'>
      <div className='flex items-center gap-3'>
        <img src={owner.avatar} alt={`${owner.name}'s avatar`} className='w-8 rounded-full' />

        <h3>{owner.name}</h3>
      </div>

      <p dangerouslySetInnerHTML={{ __html: content }} />

      <div className='flex items-center justify-between'>
        <h3 className='text-sm'>{postedAt(createdAt)}</h3>
        <div className='flex gap-8'>
          <VoteButton
            options={{
              voteFor: 'comment',
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
              voteFor: 'comment',
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
    </article>
  );
};

export default memo(CommentCard);
