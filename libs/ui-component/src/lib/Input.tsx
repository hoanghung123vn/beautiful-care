import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { value, placeholder, className, onChange, title, error, type, ...props },
    forwardedRef
  ) => {
    return (
      <div className="form-control w-full">
        {title && (
          <label className="label">
            <span className="label-text">{title}</span>
          </label>
        )}
        <input
          ref={forwardedRef}
          type={type}
          placeholder={placeholder}
          className={classNames(
            'input input-bordered w-full text-sm',
            className
          )}
          onChange={onChange}
          {...props}
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

export default Input;
