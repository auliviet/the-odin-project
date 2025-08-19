import { useState } from "react";
import {
  defaultIntroduction,
  defaultPersonalInfo,
  defaultWorkExperiences,
  defaultEducationExperiences,
} from "./utils/defaults";
import Form from "./components/form/form";
import CV from "./components/cv/cv";

function App() {
  // States
  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);
  const [introduction, setIntroduction] = useState(defaultIntroduction);
  const [workExperiences, setWorkExperiences] = useState(
    defaultWorkExperiences
  );
  const [educationExperiences, setEducationExperiences] = useState(
    defaultEducationExperiences
  );

  // Props
  const setStates = {
    setPersonalInfo,
    setIntroduction,
    setWorkExperiences,
    setEducationExperiences,
  };
  const resume = {
    personalInfo,
    introduction,
    workExperiences,
    educationExperiences,
  };

  return (
    <>
      <Form data={resume} setStates={setStates}></Form>
      <CV data={resume}></CV>
    </>
  );
}

export default App;
