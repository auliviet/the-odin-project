import { useState, type ReactNode } from "react";
import FormButton from "./form-button";
import classes from "./form-section.module.css";

interface FormSectionProps {
  sectionName: string;
  children: ReactNode;
  deleteHandler?: React.MouseEventHandler | null;
}
export default function FormSection({
  sectionName,
  children,
  deleteHandler = null,
}: FormSectionProps) {
  const [isVisible, setIsVisible] = useState(true);

  function expandAccordion(event: React.MouseEvent) {
    event.preventDefault();
    setIsVisible(!isVisible);
  }

  return (
    <section className={classes.section}>
      <header className={classes.sectionHeader}>
        <h3 className={classes.sectionName}>{sectionName}</h3>
        <div className={classes.buttonsHeader}>
          <FormButton
            type={isVisible ? "minimise" : "expend"}
            handler={expandAccordion}
          ></FormButton>
          {deleteHandler && (
            <FormButton type="delete" handler={deleteHandler}></FormButton>
          )}
        </div>
      </header>
      <div
        className={classes.formContent}
        style={isVisible ? { display: "flex" } : { display: "none" }}
      >
        {children}
      </div>
    </section>
  );
}
