import React from 'react';

export interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const CloseIcon = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  className,
  ...props
}: CloseIconProps) => (
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
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 6 6 18M6 6l12 12"
    />
  </svg>
);

export default CloseIcon;
