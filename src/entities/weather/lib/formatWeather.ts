import { formatString } from "@/shared/lib/formater.ts";

export const formatTemp = (temp: number | undefined): string => {
  return formatString(String(temp), "-");
};
