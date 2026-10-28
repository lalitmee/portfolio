export default function TiltedArrow({ className }: { className: string }) {
  return (
    <svg
      className={`tilted-arrow ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path className="arrow-shaft" d="m5 17.59 1.41 1.41L16 9.41 14.59 8z" />
      <path className="arrow-head" d="M6 6h12v12h-2V9.41L14.59 8H6z" />
    </svg>
  );
}
