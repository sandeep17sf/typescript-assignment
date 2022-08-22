import { twoDigit } from "./index";
function formatDate(form: boolean) {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    let originalObj = descriptor.value;
    descriptor.value = function () {
      let originalValue = originalObj?.apply(this);
      // format date string
      const date = new Date(originalValue);
      const day = twoDigit(date.getDate());
      const month = twoDigit(date.getMonth());
      const year = twoDigit(date.getFullYear());
      const hour = twoDigit(date.getHours());
      const minutes = twoDigit(date.getMinutes());
      const datestring = form
        ? `${year}-${month}-${day}T${hour}:${minutes}`
        : `${day}-${month}-${year} ${hour}:${minutes}`;
      return datestring;
    };
    return descriptor;
  };
}

export class DateFormatter {
  _date: any;
  constructor(dateString: string) {
    this._date = dateString;
  }

  @formatDate(false)
  formattedDate() {
    return this._date;
  }

  @formatDate(true)
  formFormatDate() {
    return this._date;
  }
}
