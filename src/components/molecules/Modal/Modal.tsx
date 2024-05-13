import { XMarkIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect, useRef, useState } from 'react';

import '@/components/molecules/Modal/Modal.css';

interface IModal {
  headerElem: React.ReactNode;
  children: React.ReactNode;
  onClickCloseModal: () => void;
}

export const Modal: React.FC<IModal> = ({
  headerElem,
  children,
  onClickCloseModal
}) => {
  const bgRef = useRef(null);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const handleOnClickBackground = (event: React.MouseEvent) => {
    const isOnClickBackground = event.target === bgRef.current;

    if (isOnClickBackground) {
      onClickCloseModal();
    }
  };

  /* istanbul ignore next -- @preserve */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClickCloseModal();
      }
    },
    [onClickCloseModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleScrollPosition: React.UIEventHandler<HTMLDivElement> = async (
    event
  ) => {
    const { scrollTop } = event.currentTarget as HTMLDivElement;

    if (scrollTop > 0) {
      setIsScroll(true);
      return;
    }
    setIsScroll(false);
  };

  return (
    <div
      className="flex justify-center items-center fixed top-0 left-0 w-screen h-screen z-[11]"
      onClick={handleOnClickBackground}>
      <div className="flex justify-center items-center fixed top-0 left-0 w-screen h-screen backdrop-blur-[2px] bg-[#1F4C4A33]" />
      <div
        id="modal"
        className={`z-[4] w-full md:w-2/3 lg:w-1/2 rounded-xl shadow-lg shadow-[#00000026] bg-[#F9F9F9] py-4 px-6`}>
        <header className={`w-full ${isScroll ? 'scrollShadow' : ''}`}>
          <div className="flex items-start justify-between mb-4">
            {headerElem}
            <div className="cursor-pointer" onClick={onClickCloseModal}>
              <XMarkIcon className="size-6 text-black" />
            </div>
          </div>
        </header>
        <div
          data-testid="scroll-div"
          className={`flex-grow max-h-[65vh] overflow-auto`}
          onScroll={handleScrollPosition}>
          {children}
        </div>
      </div>
    </div>
  );
};
