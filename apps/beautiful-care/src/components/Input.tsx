import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { value, placeholder, className, onChange, title, error, type, ...props },
    forwardedRef
  ) => {
    return (
      <div className="form-control w-full max-w-xs">
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
            'input input-bordered w-full max-w-xs text-sm',
            className
          )}
          {...props}
        />
        {error && (
          <label className="label">
            <span className="label-text-alt">{error}</span>
          </label>
        )}
      </div>
    );
  }
);

export default Input;
