import { handlerFactory } from "../../utils/factories";
import type { Introduction, Setter } from "../../utils/types";
import Input from "./form-input";
import FormSection from "./form-section";

interface FormIntroductionProps {
  data: Introduction;
  setState: Setter<Introduction>;
}
export default function FormIntroduction({
  data,
  setState,
}: FormIntroductionProps) {
  const handler = handlerFactory(data, setState);
  return (
    <FormSection sectionName="About">
      <Input
        type="textArea"
        name="introduction"
        value={data.introduction}
        handler={handler}
      ></Input>
    </FormSection>
  );
}
