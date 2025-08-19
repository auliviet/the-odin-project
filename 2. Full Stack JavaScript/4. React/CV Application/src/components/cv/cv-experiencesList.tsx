import type { EducationExperience, WorkExperience } from "../../utils/types";
import CVExperience from "./cv-experience";

export default function CVExperiencesList({
  data,
}: {
  data: WorkExperience[] | EducationExperience[];
}) {
  return (
    <ul>
      {data.map((experience) => (
        <CVExperience key={experience.id} data={experience}></CVExperience>
      ))}
    </ul>
  );
}
