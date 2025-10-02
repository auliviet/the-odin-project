import type { EducationExperience, WorkExperience } from "../../utils/types";
import CVExperience from "./cv-experience";
import classes from "./cv-experiencesList.module.css";

export default function CVExperiencesList({
  data,
}: {
  data: WorkExperience[] | EducationExperience[];
}) {
  return (
    <ul className={classes.experiencesList}>
      {data.map((experience) => (
        <CVExperience key={experience.id} data={experience}></CVExperience>
      ))}
    </ul>
  );
}
