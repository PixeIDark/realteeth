import type { District } from "@/entities/district/model/type.ts";

export const getDistricts = async (): Promise<District[]> => {
  const res = await fetch("/data/koreaDistricts.json");
  if (!res.ok) {
    throw new Error(`지명데이터를 불러오는데 실패했습니다. (status: ${res.status})`);
  }
  return res.json();
};
