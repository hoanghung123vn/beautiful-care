import classNames from 'classnames';
import { useCallback, useEffect } from 'react';
import { Datepicker } from '../date-picker';
import { NextCalendarIcon } from './Icons';

export interface DatePickerProps {
  id: string;
  label?: string;
  value: string;
  onChange?: (
    dateFormated: string,
    dateSapoFormated: string,
    dateIsoFormated: string
  ) => void;
  format?: string;
  placeholder?: string;
  errorMessage?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePicker({
  id,
  label,
  value = '',
  onChange = () => console.log('date chane'),
  format = 'dd/mm/yyyy',
  placeholder,
  errorMessage,
  minDate,
  maxDate,
}: DatePickerProps) {
  const onDateChange = useCallback(
    ({ detail }: any) => {
      onChange(
        detail.dateFormated,
        detail.dateSapoFormated,
        detail.dateIsoFormated
      );
    },
    [onChange]
  );
  useEffect(() => {
    const datepickerEl = document.getElementById(id);
    const datePicker = new Datepicker(datepickerEl as Element, {
      language: 'vi',
      format: format,
      todayHighlight: true,
      autohide: true,
      minDate,
      maxDate,
    });
    datepickerEl?.addEventListener('changeDate', onDateChange);
    return () => {
      datepickerEl?.removeEventListener('changeDate', onDateChange);
      datePicker.destroy();
    };
  }, [id, onChange, onDateChange]);

  return (
    <div className="text-sm">
      <h6 className="text-ink-80">{label}</h6>
      <div className="relative">
        <input
          type="text"
          autoComplete="off"
          className={classNames(
            'outline-none border rounded pr-3 pl-9 py-2 w-full h-10 hover:border-ink-60',
            {
              'mt-1': !!label,
              'focus:border-primary': !errorMessage,
              'border-danger': errorMessage,
            }
          )}
          id={id}
          maxLength={10}
          placeholder={placeholder || format.toUpperCase()}
          value={value}
          onChange={() => console.log()}
        />
        <label htmlFor={id} className="cursor-pointer">
          <NextCalendarIcon
            width="16"
            height="16"
            className="fill-current text-ink-40 absolute bottom-3 left-3"
          />
        </label>
      </div>
      {errorMessage && (
        <div className="text-xs text-danger ml-3 mt-2">{errorMessage}</div>
      )}
    </div>
  );
}

export default DatePicker;
