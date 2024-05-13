import { forwardRef, ReactNode } from 'react';

interface IButton {
  type?: 'button' | 'submit' | 'reset';
  option?: 'primary' | 'secondary';
  className?: string;
  testid?: string;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?: boolean;
}

type ButtonRef = HTMLButtonElement;

export const Button = forwardRef<ButtonRef, IButton>(
  (
    { type, option, className, testid, children, onClick, disabled, isLoading },
    ref
  ) => {
    const defaultStyles =
      'h-10 text-white font-bold py-2 px-4 rounded outline-none';

    const primary = `border focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-6000`;
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
    );
  }
);
