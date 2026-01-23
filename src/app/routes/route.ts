export const ROUTES = {
  HOME: "/",
  DETAIL: "/detail/:locationId",
} as const;

export const LINKS = {
  HOME: () => "/",
  DETAIL: (locationId: string) => `/detail/${locationId}`,
} as const;
