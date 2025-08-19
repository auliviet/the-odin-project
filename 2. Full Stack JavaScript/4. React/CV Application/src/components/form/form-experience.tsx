import React, { useState } from "react";
import type { EducationExperience, WorkExperience } from "../../utils/types";
import Input from "./form-input";
import { handlerFactory, WorkCategoryFactory } from "../../utils/factories";
import FormWorkCategory from "./form-workCategory";
import FormButton from "./form-button";

interface FormExperienceProps {
  data: WorkExperience | EducationExperience;
  setState: Function;
}

type ExperienceKeys = keyof WorkExperience | keyof EducationExperience;

export default function FormExperience({
  data,
  setState,
}: FormExperienceProps) {
  const keys = Object.keys(data) as ExperienceKeys[];

  const [experience, setExperience] = useState(data);

  // Update the content of all fields in the form, except Categories (nested array).
  function experienceHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const inputHandler = handlerFactory(data, setExperience);

    const newExperience = inputHandler(event);

    setExperience(newExperience);
    setState(newExperience);
  }

  // Create a new work category
  function addWorkCategory(event: React.MouseEvent) {
    event.preventDefault();

    if ("categories" in experience) {
      const newCategories = [...experience.categories];
      newCategories.push(WorkCategoryFactory());

      const newExperience = { ...experience };
      newExperience.categories = newCategories;

      setExperience(newExperience);

      setState(newExperience);
    }
  }

  return keys.map((key) => {
    switch (key) {
      case "id":
        return;
      case "categories":
        if ("categories" in experience) {
          return (
            <React.Fragment key={experience.id}>
              {experience.categories.map((category) => (
                <FormWorkCategory
                  key={category.id}
                  data={category}
                  setState={setState}
                  experience={experience}
                ></FormWorkCategory>
              ))}
              <FormButton
                type="add"
                text="Add category"
                handler={addWorkCategory}
              ></FormButton>
            </React.Fragment>
          );
        } else {
          return;
        }
      case "introduction":
        return (
          <Input
            key={key}
            type="textArea"
            name={key}
            value={experience[key as keyof typeof data]}
            handler={experienceHandler}
          ></Input>
        );
      default:
        return (
          <Input
            key={key}
            type="textArea"
            name={key}
            value={experience[key as keyof typeof data]}
            handler={experienceHandler}
          ></Input>
        );
        break;
    }
  });
}
