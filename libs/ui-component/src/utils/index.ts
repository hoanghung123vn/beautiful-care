import { formatDate } from '../date-picker';

export const getOffsetDate = (lastDate: Date) => {
  const currentDate = new Date();
  const hours = (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60);
  if (hours < 1) {
    return 'vài phút trước';
  } else if (hours < 24) {
    return `${Math.floor(hours)} giờ trước`;
  } else if (hours < 30 * 24) {
    return `${Math.floor(hours / 24)} ngày trước`;
  }
  return formatDate(lastDate, 'dd/mm/yyyy') + ' ' + formatTime(lastDate);
};

export const formatNumber = (value?: number) => {
  if (value === 0) {
    return '0';
  } else {
    return value
      ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(
          value
        )
      : '';
  }
};

export const reverseFormatNumber = (value: string) => {
  const reversedVal = value.replace(/[^\d]/g, '');
  return reversedVal;
};

export const formatTime = (date?: Date) => {
  if (date === undefined) {
    return '';
  }
  const hour =
    date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours();
  const minute =
    date.getMinutes() > 9
      ? date.getMinutes().toString()
      : '0' + date.getMinutes();
  return hour + ':' + minute;
};

export const formatTimeWithSession = (date: Date) => {
  const session = date.getHours() > 11 ? 'pm' : 'am';
  const hour =
    date.getHours() > 12
      ? date.getHours() - 12
      : date.getHours() === 0
      ? 12
      : date.getHours();
  const minute =
    date.getMinutes() > 9
      ? date.getMinutes().toString()
      : '0' + date.getMinutes();
  return hour + ':' + minute + ' ' + session;
};

export const formatTimeSeconds = (date?: Date) => {
  if (date === undefined) {
    return '';
  }
  const hour =
    date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours();
  const minute =
    date.getMinutes() > 9
      ? date.getMinutes().toString()
      : '0' + date.getMinutes();
  const seconds =
    date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
  return hour + ':' + minute + ':' + seconds;
};

export const bindParamsFilter = (filter: Record<string, any>) => {
  const params = Object.keys(filter)
    .filter(
      (key) => filter[key] === false || filter[key] === 0 || !!filter[key]
    )
    .map((key) => `${key}=${filter[key]}`);
  return params.join('&');
};

export const getPageType = (path: string) => {
  return 'Tổng quan';
};

export const toBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export function vietnameseSlug(str: string, separator = '-') {
  if (str) {
    str = str.trim();
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, '');
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\\=|\\<|\\>|\?|\/|,|\.|\\:|\\;|\\'|\\"|\\&|\\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      ''
    );
    str = str.replace(/ +/g, '-');
    if (separator) {
      return str.replace(/-/g, separator);
    }
    return str;
  } else return '';
}

export function isValidImageExtension(fileName?: string) {
  if (fileName === undefined) {
    return false;
  }
  return (
    fileName.endsWith('.png') ||
    fileName.endsWith('.jpg') ||
    fileName.endsWith('.jpeg')
  );
}

export function isValidExcelExtension(fileName?: string) {
  if (fileName === undefined) {
    return false;
  }
  return fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
}
