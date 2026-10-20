import { MdArrowBack, MdArrowForward } from 'react-icons/md';

export default function DirectionalArrow({
  direction,
}: {
  direction: 'back' | 'forward';
}) {
  const Icon = direction === 'back' ? MdArrowBack : MdArrowForward;

  return (
    <span
      className={`directional-arrow directional-arrow-${direction}`}
      aria-hidden="true"
    >
      <Icon className="arrow-current" />
      <Icon className="arrow-next" />
    </span>
  );
}
