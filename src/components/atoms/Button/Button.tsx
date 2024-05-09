import React, { forwardRef, ReactNode } from 'react';

interface IButton {
  type?: 'button' | 'submit' | 'reset';
  option?: 'primary' | 'secondary';
  className?: string;
  testid: string;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?: boolean;
}

type ButtonRef = HTMLButtonElement;

export const Button = forwardRef<ButtonRef, IButton>(({
  type,
  option,
  className,
  testid,
  children,
  onClick,
  disabled,
  isLoading
                                                      }, ref) => {

  const defaultStyles = 'h-8 min-h-8 pl-1 pr-2 py-1 font-medium';

  const primary = `btn-md bg-primary hover:bg-[#FA8559] outline-none  pressed:bg-[#EC4C00] active:bg-[#F65102] disabled:bg-[#DDDDDD] disabled:text-[#818A89] text-white`;
  const secondary = `btn-md bg-secondary text-[#031513] outline-none  hover:bg-[#DDDDDD] $ disabled:bg-[#DDDDDD] disabled:text-[#818A89]`;

  const styleOption =
    option === 'primary' ? primary : option === 'secondary' ? secondary : '';

  return (
    <button
      ref={ref}
      data-testid={testid}
      type={type}
      className={`uppercase btn ${defaultStyles} ${className} ${styleOption}`}
      onClick={onClick}
      disabled={disabled || isLoading}>
      {isLoading && (
        <span
          data-testid="loading-spinner"
          className="loading loading-spinner loading-xs"
        />
      )}
      {children}
    </button>
  )
})
