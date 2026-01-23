export const formatTemp = (temp: number | undefined): string => {
  if (temp === undefined) return "";
  return `${temp}°C`;
};

export const formatTempRange = (min: number | undefined, max: number | undefined): string => {
  if (min === undefined || max === undefined) return "";
  return `${min}°C / ${max}°C`;
};
