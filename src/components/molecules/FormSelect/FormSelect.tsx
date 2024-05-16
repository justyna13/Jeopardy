import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/16/solid';
import { useState, MouseEvent, useRef, HTMLProps, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { IOption } from '@/types/form';

interface IFormSelect {
  name: string;
  options: IOption[];
  placeholder?: HTMLProps<HTMLInputElement>['placeholder'];
  label?: string;
}
const defaultStyle =
  'h-10 min-h-10 max-h-10 input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white';

export const FormSelect: FC<IFormSelect> = ({
  name,
  options,
  placeholder,
  label
}: IFormSelect) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const { setValue, trigger, getValues } = useFormContext();

  const [isOpen, setIsOpen] = useState(false);
  const selected = getValues(name);
  const selectedLabel = options?.find((el) => el.value === selected)?.label;

  /* istanbul ignore next -- @preserve */
  const handleChange = async (e: MouseEvent<HTMLElement>) => {
    const targetEl = e.currentTarget;
    setValue(name, targetEl.getAttribute('value'));
    await trigger(name);
  };

  const setActiveIcon = () => {
    setIsOpen(true);
    btnRef.current?.focus();
  };

  const setInactiveIcon = () => setIsOpen(false);

  return (
    <div className="form-control">
      {label ? <label className="label pl-0 pb-1">{label}</label> : null}
      <div className={`dropdown dropdown-top `} role="select">
        <div className="relative">
          <button
            type="button"
            onClick={setActiveIcon}
            ref={btnRef}
            onBlur={setInactiveIcon}
            className={`flex items-center w-full basis-0 ${defaultStyle} pr-8`}>
            <span className="ml-2 block truncate">
              {(selectedLabel as string) ?? placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              {isOpen ? (
                <ArrowDownIcon color="#1F4C4A" />
              ) : (
                <ArrowUpIcon color="#1F4C4A" />
              )}
            </span>
          </button>

          {/* Custom options list */}
          <div
            className={`${
              isOpen ? 'absolute' : 'hidden'
            } z-10 mt-2 max-h-[161px] w-full rounded-lg bg-[#F3F3F3] shadow-lg shadow-[#00000026] focus:outline-none sm:text-sm p-2`}>
            <ul className="text-base max-h-[145px] overflow-auto">
              {options.map(({ label, value }: IOption) => (
                <li
                  role="option"
                  className={`${
                    value === selected ? 'bg-white' : ''
                  } text-gray-900 relative select-none px-2 py-1 cursor-pointer !h-[29px] !max-h-[29px]`}
                  key={`${label}-${value}`}
                  onMouseDown={handleChange}
                  value={value}>
                  <div className="flex items-center gap-[8px] !h-[21px] !max-h-[21px]">
                    <span className="overflow-ellipsis whitespace-nowrap overflow-hidden">
                      {label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
