import { RegisterOptions, useFormContext } from 'react-hook-form';

import { Input } from '@/components/atoms';
import '@/components/molecules/FormInput/FormInput.scss';

type InputProps = React.ComponentProps<typeof Input>;

interface IFormInput extends InputProps {
  label: string;
  validationSchema?: RegisterOptions | undefined;
}

export const FormInput: React.FC<IFormInput> = ({
  label,
  name,
  type,
  id,
  placeholder,
  validationSchema
}: IFormInput) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  const isError = errors[name];

  return (
    <div className="form-control" data-testid={`form-input-${name}`}>
      <div className="label-wr">
        <label className="form-label">{label}</label>
        {isError ? (
          <span className="error-msg">{isError.message as string}</span>
        ) : null}
      </div>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        validationSchema={validationSchema}
        register={register}
      />
    </div>
  );
};
