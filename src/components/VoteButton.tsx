import { IconArrowDown, IconArrowUp } from '@tabler/icons';

import Tooltip from './Tooltip';

type VoteButtonProps = {
  options: {
    voteFor: 'thread' | 'comment';
    voteType: 'up' | 'down';
    isDisabled: boolean;
    isVoted: boolean;
  };
  onVote: () => void;
  onNeutral: () => void;
  children: React.ReactNode;
};

const VoteButton = ({
  options: { voteFor, voteType, isDisabled, isVoted },
  onVote,
  onNeutral,
  children,
}: VoteButtonProps) => {
  const title = isDisabled
    ? 'Log in to vote'
    : `${isVoted ? 'undo' : ''} ${voteType} vote this ${voteFor}`;

  const handleClick = () => {
    if (isVoted) {
      onNeutral();
    } else {
      onVote();
    }
  };

  return (
    <Tooltip content={title}>
      <button
        type='button'
        disabled={isDisabled}
        className={isVoted ? 'text-green-600' : ''}
        onClick={handleClick}
      >
        {voteType === 'up' ? <IconArrowUp /> : <IconArrowDown />}
        {children}
      </button>
    </Tooltip>
  );
};

export default VoteButton;
