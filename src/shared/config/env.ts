export const ENV = {
  WEATHER_API_KEY: import.meta.env.VITE_WEATHER_API_KEY,
  WEATHER_BASE_URL: "https://api.openweathermap.org/data/2.5",
} as const;
