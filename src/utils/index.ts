export function dateFormat(str: string) {
  const d = new Date(str);
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  const datestring = `${day}-${month}-${year} ${hour}:${minutes}`;
  return datestring;
}
