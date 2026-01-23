import type { District } from "@/shared/data/koreaDistricts";

export const filterDistricts = (districts: District[], query: string, limit = 20): District[] => {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return districts.filter((d) => d.fullName.includes(trimmed) || d.name.includes(trimmed)).slice(0, limit);
};
