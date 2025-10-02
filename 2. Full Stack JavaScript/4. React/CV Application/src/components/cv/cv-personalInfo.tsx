import type { PersonalInfo } from "../../utils/types";
import classes from "./cv-personalInfo.module.css";

export default function CVPersonalInfo({ data }: { data: PersonalInfo }) {
  return (
    <header className={classes.header}>
      <div className={classes.title}>
        <h1>{data.firstName + " " + data.lastName}</h1>
        <h2>{data.jobTitle}</h2>
      </div>
      <div className={classes.contact}>
        <p>{data.phone}</p>
        <p>{data.address}</p>
        <p>
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </p>
      </div>
    </header>
  );
}
