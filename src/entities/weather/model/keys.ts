export const weatherKeys = {
  all: ["weather"],
  current: (lat: number, lon: number) => [...weatherKeys.all, "current", lat, lon],
  forecast: (lat: number, lon: number) => [...weatherKeys.all, "forecast", lat, lon],
} as const;
