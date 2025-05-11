import React from 'react';

export interface SunIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const SunIcon = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  className,
  ...props
}: SunIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="4" fill="currentColor" />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M12 5V3M12 21v-2M16.95 7.05l1.414-1.414M5.636 18.364L7.05 16.95M19 12h2M3 12h2M16.95 16.95l1.414 1.414M5.636 5.636L7.05 7.05"
    />
  </svg>
);

export default SunIcon;
