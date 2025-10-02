import type { EducationExperience, WorkExperience } from "../../utils/types";
import WorkCategory from "./cv-workCategory";
import classes from "./cv-experience.module.css";

export default function CVExperience({
  data,
}: {
  data: WorkExperience | EducationExperience;
}) {
  return (
    <li className={classes.experience}>
      <header className={classes.experienceHeader}>
        <div className={classes.experienceTitle}>
          <h4>
            {"jobTitle" in data ? data.jobTitle : data.degree}, {data.location}
          </h4>
          <h5>{"company" in data ? data.company : data.school}</h5>
        </div>
        <div className={classes.experienceDates}>
          <p>{data.startDate + " - " + data.endDate}</p>
        </div>
      </header>
      <p className={classes.introduction}>{data.introduction}</p>

      {"categories" in data && (
        <ul className={classes.categories}>
          {data.categories.map((category) => (
            <WorkCategory key={category.id} data={category}></WorkCategory>
          ))}
        </ul>
      )}
    </li>
  );
}
