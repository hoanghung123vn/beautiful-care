import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes } from 'react';
import { NumericFormat } from 'react-number-format';

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  error?: string;
  value: number;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { placeholder, className, onChange, title, error, value, ...props },
    forwardedRef
  ) => {
    return (
      <div className="form-control w-full">
        {title && (
          <label className="label">
            <span className="label-text">{title}</span>
          </label>
        )}
        <NumericFormat
          {...props}
          getInputRef={forwardedRef}
          allowLeadingZeros
          thousandSeparator=","
          type="text"
          placeholder={placeholder}
          className={classNames(
            'input input-bordered w-full text-sm',
            className
          )}
          value={value}
          defaultValue={undefined}
        />
        {error && (
          <label className="label">
            <span className="label-text-alt text-red-400">{error}</span>
          </label>
        )}
      </div>
    );
  }
);

export default NumberInput;
