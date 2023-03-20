import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  error?: string;
}

export default function Input({
  value,
  placeholder,
  className,
  onChange,
  title,
  error,
  type,
  ...props
}: InputProps) {
  return (
    <div className="form-control w-full max-w-xs">
      {title && (
        <label className="label">
          <span className="label-text">{title}</span>
        </label>
      )}
      <input
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
