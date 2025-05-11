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
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
     className={className}
    {...props}
  >
    <path d="M15 6L9 12L15 18" stroke="#FFFFFF" strokeWidth={2} />
  </svg>
);

export default LeftArrowIcon;
