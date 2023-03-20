import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  title?: string;
  error?: string;
}

export default function Select({ title, error }: SelectProps) {
  return (
    <div className="form-control w-full max-w-xs">
      {title && (
        <label className="label">
          <span className="label-text">{title}</span>
        </label>
      )}
      <select className="select select-bordered">
        <option disabled selected>
          Pick one
        </option>
        <option>Star Wars</option>
        <option>Harry Potter</option>
        <option>Lord of the Rings</option>
        <option>Planet of the Apes</option>
        <option>Star Trek</option>
      </select>
      {error && (
        <label className="label">
          <span className="label-text-alt">{error}</span>
        </label>
      )}
    </div>
  );
}
