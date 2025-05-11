import React from 'react';

export interface LeftArrowIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const LeftArrowIcon = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  className,
  ...props
}: LeftArrowIconProps) => (
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
    <path strokeWidth={2} d="m15 6-6 6 6 6" />
  </svg>
);

export default LeftArrowIcon;
