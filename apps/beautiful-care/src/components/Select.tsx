import { forwardRef, SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  title?: string;
  error?: string;
  options: OptionProp[];
}

export interface OptionProp {
  label: string;
  value: string | number;
  disabled?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ title, error, options, value, ...props }, ref) => {
    return (
      <div className="form-control w-full">
        {title && (
          <label className="label">
            <span className="label-text">{title}</span>
          </label>
        )}
        <select
          className="select select-bordered"
          ref={ref}
          value={value}
          {...props}
        >
          {options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <label className="label">
            <span className="label-text-alt text-red-400">{error}</span>
          </label>
        )}
      </div>
    );
  }
);

export default Select;
