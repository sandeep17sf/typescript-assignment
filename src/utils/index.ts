export * from "./date-formatter";

export const twoDigit = (value: string | number) => {
  return String(value).padStart(2, "0");
};
