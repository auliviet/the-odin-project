import { useState, type ReactNode } from "react";
import FormButton from "./form-button";

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
    <section className="form-section">
      <h3>{sectionName}</h3>
      <FormButton
        type={isVisible ? "minimise" : "expend"}
        handler={expandAccordion}
      ></FormButton>
      {deleteHandler && (
        <FormButton type="delete" handler={deleteHandler}></FormButton>
      )}
      <div style={isVisible ? { display: "inherit" } : { display: "none" }}>
        {children}
      </div>
    </section>
  );
}
