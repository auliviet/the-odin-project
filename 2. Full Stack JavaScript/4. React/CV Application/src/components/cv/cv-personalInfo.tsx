import type { PersonalInfo } from "../../utils/types";

export default function CVPersonalInfo({ data }: { data: PersonalInfo }) {
  return (
    <header className="cv-header">
      <div className="cv-header__title">
        <h1>{data.firstName + " " + data.lastName}</h1>
        <h2>{data.jobTitle}</h2>
      </div>
      <div className="cv-header__contact">
        <p>{data.phone}</p>
        <p>{data.address}</p>
        <p>{data.email}</p>
      </div>
    </header>
  );
}
