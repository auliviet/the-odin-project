import type { ReactElement } from "react";

interface CVSectionProps {
  sectionName: string;
  children: ReactElement;
}
export default function CVSection({ sectionName, children }: CVSectionProps) {
  return (
    <section>
      <h3>{sectionName}</h3>
      {children}
    </section>
  );
}
