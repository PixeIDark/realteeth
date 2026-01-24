import { useSuspenseQuery } from "@tanstack/react-query";
import { districtKeys } from "@/entities/district/model/keys.ts";
import { getDistricts } from "@/entities/district/api/districtApi.ts";

export function useDistricts() {
  return useSuspenseQuery({
    queryKey: districtKeys.all,
    queryFn: getDistricts,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
