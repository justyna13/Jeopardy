import { memo } from 'react';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import '@/components/atoms/Input/Input.scss';

interface IInput {
  id?: string;
  name: string;
  register?: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  type?: React.HTMLProps<HTMLInputElement>['type'];
  placeholder?: React.HTMLProps<HTMLInputElement>['placeholder'];
  validationSchema?: RegisterOptions | undefined;
  disabled?: React.HTMLProps<HTMLInputElement>['disabled'];
}

export const Input: React.FC<IInput> = memo(
  ({
    register,
    name,
    id,
    disabled,
    type,
    placeholder,
    validationSchema
  }: IInput) => {
    const isFormRegistered = register
      ? register(name, validationSchema)
      : undefined;

    return (
      <input
        id={id}
        type={type}
        disabled={disabled}
        name={name}
        className={
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
        }
        placeholder={placeholder}
        {...isFormRegistered}
      />
    );
  }
);
