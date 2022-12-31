import Tippy from '@tippyjs/react';

type TooltipProps = {
  content: string;
  children: React.ReactElement;
};

const Tooltip = ({ content, children }: TooltipProps) => (
  <Tippy placement='bottom' delay={200} content={<span className='text-como-50'>{content}</span>}>
    <div>{children}</div>
  </Tippy>
);

export default Tooltip;
