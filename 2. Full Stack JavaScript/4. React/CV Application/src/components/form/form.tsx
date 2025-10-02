import type {
  EducationExperience,
  Introduction,
  PersonalInfo,
  Setter,
  WorkExperience,
} from "../../utils/types";
import FormExperiencesList from "./form-experiencesList";
import FormIntroduction from "./form-introduction";
import FormPersonalInfo from "./form-personalInfo";
import classes from "./form.module.css";

// Interfaces
interface FormSetters {
  setPersonalInfo: Setter<PersonalInfo>;
  setIntroduction: Setter<Introduction>;
  setWorkExperiences: Setter<WorkExperience[]>;
  setEducationExperiences: Setter<EducationExperience[]>;
}
interface FormData {
  personalInfo: PersonalInfo;
  introduction: Introduction;
  workExperiences: WorkExperience[];
  educationExperiences: EducationExperience[];
}
interface FormProps {
  data: FormData;
  setStates: FormSetters;
}

export default function Form({ data, setStates }: FormProps) {
  return (
    <form className={classes.form}>
      <FormPersonalInfo
        data={data.personalInfo}
        setState={setStates.setPersonalInfo}
      ></FormPersonalInfo>

      <FormIntroduction
        data={data.introduction}
        setState={setStates.setIntroduction}
      ></FormIntroduction>

      <FormExperiencesList
        data={data.workExperiences}
        setState={setStates.setWorkExperiences}
        type="work"
      ></FormExperiencesList>

      <FormExperiencesList
        data={data.educationExperiences}
        setState={setStates.setEducationExperiences}
        type="education"
      ></FormExperiencesList>
    </form>
  );
}
