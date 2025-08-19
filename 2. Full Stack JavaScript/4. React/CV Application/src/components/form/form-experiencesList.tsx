import {
  WorkExperienceFactory,
  EducationExperienceFactory,
} from "../../utils/factories";
import type {
  EducationExperience,
  Setter,
  WorkExperience,
} from "../../utils/types";
import FormButton from "./form-button";
import FormExperience from "./form-experience";
import FormSection from "./form-section";

type Experience = EducationExperience | WorkExperience;

interface FormExperiencesListPros<T extends Experience> {
  data: T[];
  setState: Setter<T[]>;
  type: "education" | "work";
}
export default function FormExperiencesList<T extends Experience>({
  data,
  setState,
  type,
}: FormExperiencesListPros<T>) {
  // Update the content of an experience using setState
  function updateExperiences(dataSlice: T) {
    const experienceIndex = data.findIndex(
      (experience) => experience.id === dataSlice.id
    );
    const newExperiences = [...data];
    newExperiences[experienceIndex] = dataSlice;

    setState(newExperiences);
  }

  // Add a new experience to the current Education or Work experiences arrays
  function addExperience(event: React.MouseEvent) {
    event.preventDefault();
    const newExperiences = [...data];

    const newExperience =
      type === "work"
        ? (WorkExperienceFactory() as T)
        : (EducationExperienceFactory() as T);

    newExperiences.push(newExperience);
    setState(newExperiences);
  }

  // Delete an experience from the current Education or Work experiences arrays
  function deleteExperience(index: number) {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      const newExperiences = [...data];
      newExperiences.splice(index, 1);
      setState(newExperiences);
    };
  }

  return (
    <FormSection
      sectionName={
        type === "work" ? "Work experiences" : "Education experiences"
      }
    >
      {data.map((experience, index) => {
        const deleteHandler = deleteExperience(index);
        return (
          <FormSection
            key={experience.id}
            sectionName={
              "jobTitle" in experience
                ? `Job #${index + 1}`
                : `Degre #${index + 1}`
            }
            deleteHandler={deleteHandler}
          >
            <FormExperience
              data={experience}
              setState={updateExperiences}
            ></FormExperience>
          </FormSection>
        );
      })}
      <FormButton
        type="add"
        text={type === "work" ? "Add work experience" : "Add degree"}
        handler={addExperience}
      ></FormButton>
    </FormSection>
  );
}
