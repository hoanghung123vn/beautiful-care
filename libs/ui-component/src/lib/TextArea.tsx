import { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ title, error, value, ...props }, ref) => {
    return (
      <div className="form-control">
        {title && (
          <label className="label">
            <span className="label-text">{title}</span>
          </label>
        )}
        <textarea
          className="textarea textarea-bordered h-24"
          value={value}
          ref={ref}
          {...props}
        ></textarea>
        {error && (
          <label className="label">
            <span className="label-text-alt text-red-400">{error}</span>
          </label>
        )}
      </div>
    );
  }
);

export default TextArea;
