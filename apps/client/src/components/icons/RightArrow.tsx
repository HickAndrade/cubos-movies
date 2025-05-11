import React from 'react';

export interface RightArrowIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const RightArrowIcon = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  className,
  ...props
}: RightArrowIconProps) => (
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
    <path strokeWidth={2} d="m9 6 6 6-6 6" />
  </svg>
);

export default RightArrowIcon;
