import { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title?: string;
}

export default function TextArea({ title }: TextAreaProps) {
  return (
    <div className="form-control">
      {title && (
        <label className="label">
          <span className="label-text">{title}</span>
        </label>
      )}
      <textarea
        className="textarea textarea-bordered h-24"
        placeholder="Bio"
      ></textarea>
    </div>
  );
}
