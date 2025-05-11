import React from 'react';

export interface FilterIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const FilterIcon = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  className,
  ...props
}: FilterIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeWidth={2}
      d="M5 12V4M19 20v-2M5 20v-4M19 12V4M12 7V4M12 20v-8"
    />
    <circle cx="5" cy="14" r="2" strokeLinecap="round" strokeWidth={2} />
    <circle cx="12" cy="9" r="2" strokeLinecap="round" strokeWidth={2} />
    <circle cx="19" cy="15" r="2" strokeLinecap="round" strokeWidth={2} />
  </svg>
);

export default FilterIcon;
