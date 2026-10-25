import {
  useId,
  type JSX,
  type ReactElement,
  type ReactNode,
  type SVGProps,
} from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import type { IconType } from 'react-icons';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'>;

function Icon({
  variant,
  children,
  className = '',
  ...props
}: IconProps & { variant: string; children: ReactNode }): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={`animated-icon icon-${variant} ${className}`.trim()}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function BulbIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="bulb" {...props}>
      <path d="M9 17c0-3-3-3.5-3-7a6 6 0 0 1 12 0c0 3.5-3 4-3 7M9 18h6m-5 3h4" />
      <g className="bulb-rays">
        {['M12 1v1', 'm3 3 1 1', 'M1 10h2', 'm20 4 1-1', 'M21 10h2'].map(
          (d) => (
            <path key={d} className="icon-detail" d={d} />
          ),
        )}
      </g>
    </Icon>
  );
}
export function SlidersIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="sliders" {...props}>
      <path d="M4 3v18M12 3v18M20 3v18" />
      <path className="icon-detail slider-one" d="M2 8h4" strokeWidth="4" />
      <path className="icon-detail slider-two" d="M10 16h4" strokeWidth="4" />
      <path className="icon-detail slider-three" d="M18 9h4" strokeWidth="4" />
    </Icon>
  );
}
export function WidgetsIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="widgets" {...props}>
      <rect
        className="icon-detail tile-one"
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1"
      />
      <rect
        className="icon-detail tile-two"
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1"
      />
      <rect
        className="icon-detail tile-three"
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1"
      />
      <rect
        className="icon-detail tile-four"
        x="14"
        y="14"
        width="7"
        height="7"
        rx="1"
      />
    </Icon>
  );
}
export function ConstructionIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="construction" {...props}>
      <path d="M3 21h18M5 18v3m14-3v3" />
      <path
        className="icon-detail tool-joint"
        d="m6 18 9-9m-1-5 3 3 4-1-1 4-3 1-4-4 1-3Z"
      />
    </Icon>
  );
}
export function BriefcaseIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="briefcase" {...props}>
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M8 7V4h8v3M3 12l7 2m4 0 7-2" />
      <rect
        className="icon-detail case-clasp"
        x="10"
        y="12"
        width="4"
        height="4"
        rx="0.5"
      />
    </Icon>
  );
}
export function EducationIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="education" {...props}>
      <path d="m2 8 10-5 10 5-10 5L2 8Zm4 3v6c4 3 8 3 12 0v-6" />
      <path className="icon-detail tassel" d="M22 8v9m-1 2 1-2 1 2" />
    </Icon>
  );
}
export function DocumentIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="document" {...props}>
      <path d="M14 2H5v20h14V7l-5-5Zm0 0v5h5" />
      <path
        className="icon-detail document-lines"
        pathLength="1"
        d="M8 11h8M8 15h8M8 18h5"
      />
    </Icon>
  );
}
export function CodeIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="code" {...props}>
      <path d="m14 4-4 16" />
      <path className="icon-detail bracket-left" d="m7 7-5 5 5 5" />
      <path className="icon-detail bracket-right" d="m17 7 5 5-5 5" />
    </Icon>
  );
}
export function InfoIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="info" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path
        className="icon-detail inner-mark"
        pathLength="1"
        d="M12 11v6m0-10v.1"
      />
    </Icon>
  );
}
export function OutcomeIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="outcome" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path
        className="icon-detail inner-mark"
        pathLength="1"
        d="m7 12 3 3 7-7"
      />
    </Icon>
  );
}
export function ExternalLinkIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="external-link" {...props}>
      <path d="M10 4H4v16h16v-6" />
      <path className="icon-detail external-arrow" d="M13 3h8v8m0-8L10 14" />
    </Icon>
  );
}
export function EmailIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="email" {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="m3 18 6-6m12 6-6-6" />
      <path className="icon-detail envelope-flap" d="m3 6 9 7 9-7" />
    </Icon>
  );
}
export function LocationIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="location" {...props}>
      <path d="M19 10c0 6-7 12-7 12S5 16 5 10a7 7 0 1 1 14 0Z" />
      <circle className="icon-detail location-dot" cx="12" cy="10" r="2.5" />
    </Icon>
  );
}
export function SendIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="send" {...props}>
      <path d="m3 3 19 9-19 9 4-9-4-9Z" />
      <path className="icon-detail send-strokes" pathLength="1" d="M7 12h15" />
    </Icon>
  );
}
export function MenuIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="menu" {...props}>
      <path className="icon-detail menu-top" d="M3 6h18" />
      <path d="M3 12h18" />
      <path className="icon-detail menu-bottom" d="M3 18h18" />
    </Icon>
  );
}
export function CloseIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="close" {...props}>
      <path className="icon-detail close-one" d="m5 5 14 14" />
      <path className="icon-detail close-two" d="M19 5 5 19" />
    </Icon>
  );
}
export function SunIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="sun" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path
        className="icon-detail sun-rays"
        d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"
      />
    </Icon>
  );
}
export function MoonIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="moon" {...props}>
      <path
        className="icon-detail moon-phase"
        fill="none"
        d="M14 3C8 1 3 5 3 11C3 17 8 22 14 21C17 20 20 18 21 15C12 18 7 9 14 3Z"
      />
    </Icon>
  );
}
export function PaletteIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="palette" {...props}>
      <path d="M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 1-4c-2-1-1-3 1-3h2c5 0 4-11-6-11Z" />
      <g className="palette-wells" fill="currentColor" stroke="none">
        {[
          [7, 10],
          [11, 7],
          [16, 8],
          [6, 15],
        ].map(([cx, cy]) => (
          <circle key={cx} className="icon-detail" cx={cx} cy={cy} r="1.3" />
        ))}
      </g>
    </Icon>
  );
}
export function CheckIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="check" {...props}>
      <path
        className="icon-detail check-stroke"
        pathLength="1"
        d="m4 12 5 5L20 6"
      />
    </Icon>
  );
}
export function UpArrowIcon(props: IconProps): JSX.Element {
  return (
    <Icon variant="up-arrow" {...props}>
      <path className="icon-detail up-shaft" d="M12 20V5" />
      <path className="icon-detail up-head" d="m5 11 7-7 7 7" />
    </Icon>
  );
}

function Brand({
  logo,
  ...props
}: IconProps & { logo: IconType }): JSX.Element {
  const id = `brand-${useId()}`;
  const original = logo({}) as ReactElement<{
    attr: { viewBox: string };
    children: ReactNode;
  }>;
  const [, , width, height] = original.props.attr.viewBox
    .split(' ')
    .map(Number);
  const scale = 24 / Math.max(width, height);
  const shape = (
    <g
      transform={`translate(${(24 - width * scale) / 2} ${(24 - height * scale) / 2}) scale(${scale})`}
    >
      {original.props.children}
    </g>
  );
  return (
    <Icon variant="brand" {...props} stroke="none" fill="currentColor">
      <defs>
        <clipPath id={id}>{shape}</clipPath>
      </defs>
      {shape}
      <g clipPath={`url(#${id})`}>
        <path
          className="icon-detail brand-highlight"
          d="M-20 0L-15 0L-3 24L-8 24Z"
          stroke="var(--paper)"
          strokeWidth="3"
        />
      </g>
    </Icon>
  );
}
export function GithubIcon(props: IconProps): JSX.Element {
  return <Brand logo={FaGithub} {...props} />;
}
export function LinkedinIcon(props: IconProps): JSX.Element {
  return <Brand logo={FaLinkedin} {...props} />;
}
