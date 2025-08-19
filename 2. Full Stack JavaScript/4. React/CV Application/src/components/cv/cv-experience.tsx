import type { EducationExperience, WorkExperience } from "../../utils/types";
import WorkCategory from "./cv-workCategory";

export default function CVExperience({
  data,
}: {
  data: WorkExperience | EducationExperience;
}) {
  return (
    <li className="cv-experience">
      <header>
        <div className="cv-experience__title">
          <h4>
            {"jobTitle" in data
              ? data.jobTitle
              : data.degree + ", " + data.location}
          </h4>
          <h5>{"company" in data ? data.company : data.school}</h5>
        </div>
        <div className="cv-experience__dates">
          <p>{data.startDate + " - " + data.endDate}</p>
        </div>
      </header>
      <p>{data.introduction}</p>

      {"categories" in data && (
        <ul>
          {data.categories.map((category) => (
            <WorkCategory key={category.id} data={category}></WorkCategory>
          ))}
        </ul>
      )}
    </li>
  );
}
