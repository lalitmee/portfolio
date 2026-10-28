export default function DirectionalArrow({
  direction,
}: {
  direction: 'back' | 'forward';
}) {
  return (
    <span
      className={`directional-arrow directional-arrow-${direction}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
        <g
          transform={
            direction === 'back' ? 'translate(24 0) scale(-1 1)' : undefined
          }
        >
          <path className="arrow-shaft" d="M4 11h12.17v2H4z" />
          <path
            className="arrow-head"
            d="M16.17 11 10.59 5.41 12 4l8 8-8 8-1.41-1.41L16.17 13z"
          />
        </g>
      </svg>
    </span>
  );
}
