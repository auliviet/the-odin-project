import { handlerFactory } from "../../utils/factories";
import type { PersonalInfo, Setter } from "../../utils/types";
import Input from "./form-input";
import FormSection from "./form-section";

interface FormPersonalInfoProps {
  data: PersonalInfo;
  setState: Setter<PersonalInfo>;
}
export default function FormPersonalInfo({
  data,
  setState,
}: FormPersonalInfoProps) {
  const handler = handlerFactory(data, setState);
  return (
    <FormSection sectionName="Personal Information">
      <Input name="firstName" value={data.firstName} handler={handler}></Input>
      <Input name="lastName" value={data.lastName} handler={handler}></Input>
      <Input name="jobTitle" value={data.jobTitle} handler={handler}></Input>
      <Input
        type="phone"
        name="phone"
        value={data.phone}
        handler={handler}
      ></Input>
      <Input name="address" value={data.address} handler={handler}></Input>
      <Input
        type="email"
        name="email"
        value={data.email}
        handler={handler}
      ></Input>
    </FormSection>
  );
}
