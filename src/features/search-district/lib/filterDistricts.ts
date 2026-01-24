import type { District } from "@/entities/district/model/type.ts";

export const filterDistricts = (districts: District[], query: string, limit = 20): District[] => {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return districts.filter((d) => d.fullName.includes(trimmed) || d.name.includes(trimmed)).slice(0, limit);
};
