import type { ReactNode } from "react";

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  extra?: ReactNode;
}

function SectionHeader({ icon, title, extra }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-base sm:text-xl">
        {icon}
        {title}
      </span>
      {extra}
    </div>
  );
}

export default SectionHeader;
