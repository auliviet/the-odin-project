import type { ReactElement } from "react";
import classes from "./cv-section.module.css";

interface CVSectionProps {
  sectionName: string;
  children: ReactElement;
}
export default function CVSection({ sectionName, children }: CVSectionProps) {
  return (
    <section className={classes.section}>
      <h3>{sectionName}</h3>
      {children}
    </section>
  );
}
