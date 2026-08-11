import type { SVGProps } from "react";

export type LandingIconName =
  | "forum"
  | "tv"
  | "visibility"
  | "hearing"
  | "bluetooth"
  | "support_agent"
  | "verified"
  | "event_available"
  | "location_on"
  | "map"
  | "add"
  | "remove";

type LandingIconProps = SVGProps<SVGSVGElement> & {
  name: LandingIconName;
  title?: string;
};

const paths: Record<LandingIconName, JSX.Element> = {
  forum: (
    <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
  ),
  tv: (
    <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
  ),
  visibility: (
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  ),
  hearing: (
    <path d="M17 20c-.29 0-.56-.06-.76-.15-.71-.37-1.21-.88-1.71-2.38-.51-1.56-1.47-2.29-2.39-3-.79-.61-1.61-1.24-2.32-2.53C9.29 10.98 9 9.86 9 9c0-2.8 2.2-5 5-5 2.56 0 4.63 1.79 4.95 4.15l1.98-.27C20.49 3.97 17.55 1 14 1 9.86 1 6.5 4.36 6.5 8.5c0 1.23.35 2.42.96 3.45.94 1.59 1.96 2.38 2.89 3.1.7.54 1.27.98 1.61 2.07.4 1.25.84 1.84 1.24 2.05.16.08.36.13.55.13 1.1 0 2-.9 2-2h-1.5c0 .28-.22.5-.5.5zM8.5 12c-.83 0-1.5.67-1.5 1.5S7.67 15 8.5 15s1.5-.67 1.5-1.5S9.33 12 8.5 12zm-3 3c-.83 0-1.5.67-1.5 1.5S4.67 18 5.5 18s1.5-.67 1.5-1.5S6.33 15 5.5 15z" />
  ),
  bluetooth: (
    <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z" />
  ),
  support_agent: (
    <path d="M12 1a9 9 0 0 0-9 9v7a3 3 0 0 0 3 3h1v-8H5v-2a7 7 0 0 1 14 0v2h-2v8h1a3 3 0 0 0 3-3v-7a9 9 0 0 0-9-9zm-4 17.5A1.5 1.5 0 1 1 9.5 17 1.5 1.5 0 0 1 8 18.5zm8 0A1.5 1.5 0 1 1 17.5 17 1.5 1.5 0 0 1 16 18.5z" />
  ),
  verified: (
    <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
  ),
  event_available: (
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7.18 12.4l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.65 5.66z" />
  ),
  location_on: (
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  ),
  map: (
    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
  ),
  add: <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />,
  remove: <path d="M19 13H5v-2h14v2z" />,
};

/**
 * Inline SVG icons for landing pages — avoids Material Symbols webfont on /lp/*.
 */
export function LandingIcon({
  name,
  className,
  title,
  ...rest
}: LandingIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={className ?? "h-[1em] w-[1em] shrink-0"}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
