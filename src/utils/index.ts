export function dateFormat(str: string,form?: boolean) {
  const d = new Date(str);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth()).padStart(2, '0');
  const year = d.getFullYear();
  const hour = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const datestring = form ? `${year}-${month}-${day}T${hour}:${minutes}`: `${day}-${month}-${year} ${hour}:${minutes}`;
  return datestring;
}
