import type {
  PersonalInfo,
  Introduction,
  WorkExperience,
  EducationExperience,
} from "../../utils/types";
import CVSection from "./cv-section";
import CVExperiencesList from "./cv-experiencesList";
import CVIntroduction from "./cv-introduction";
import CVPersonalInfo from "./cv-personalInfo";
import classes from "./cv.module.css";

export default function CV({
  data,
}: {
  data: {
    personalInfo: PersonalInfo;
    introduction: Introduction;
    workExperiences: WorkExperience[];
    educationExperiences: EducationExperience[];
  };
}) {
  return (
    <section className={classes.cv}>
      <CVPersonalInfo data={data.personalInfo}></CVPersonalInfo>
      <CVSection sectionName="Hello,">
        <CVIntroduction data={data.introduction}></CVIntroduction>
      </CVSection>
      <CVSection sectionName="Work Experiences">
        <CVExperiencesList data={data.workExperiences}></CVExperiencesList>
      </CVSection>
      <CVSection sectionName="Education">
        <CVExperiencesList data={data.educationExperiences}></CVExperiencesList>
      </CVSection>
    </section>
  );
}
