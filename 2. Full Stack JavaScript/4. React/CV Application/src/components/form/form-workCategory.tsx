import { useState } from "react";
import type { WorkCategory, WorkExperience } from "../../utils/types";
import FormInput from "./form-input";
import FormSection from "./form-section";
import { WorkItemFactory } from "../../utils/factories";
import FormButton from "./form-button";
import classes from "./form-workCategory.module.css";

interface FormWorkCategoryProps {
  data: WorkCategory;
  setState: Function;
  experience: WorkExperience;
}
export default function FormWorkCategory({
  data,
  setState,
  experience,
}: FormWorkCategoryProps) {
  const [categoryName, setCategoryName] = useState(data.categoryName);
  const [items, setItems] = useState(data.items);

  function handleCategoryName(event: React.ChangeEvent<HTMLInputElement>) {
    const newCategoryName = event.target.value;
    setCategoryName(newCategoryName);

    const newExperience = updateWorkExperience(
      experience,
      "categoryName",
      newCategoryName
    );

    setState(newExperience);
  }

  function handleWorkItem(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    const itemIndex = data.items.findIndex((item) => item.id === id);
    const newItem = event.target.value;
    const newItems = [...items];
    newItems[itemIndex].label = newItem;
    setItems(newItems);

    const newExperience = updateWorkExperience(experience, "items", newItems);

    setState(newExperience);
  }

  function handleDeleteWorkCategory(event: React.MouseEvent) {
    event.preventDefault();
    const newExperience = { ...experience };
    const categoryIndex = newExperience.categories.findIndex(
      (exp) => exp.id === experience.id
    );

    newExperience.categories.splice(categoryIndex, 1);

    setState(newExperience);
  }

  function handleAddWorkItem(event: React.MouseEvent) {
    event.preventDefault();

    const newItems = [...data.items];
    newItems.push(WorkItemFactory());

    setItems(newItems);

    const newExperience = updateWorkExperience(experience, "items", newItems);

    setState(newExperience);
  }

  function handleDeleteWorkItem(event: React.MouseEvent, id: string) {
    event.preventDefault();

    const itemIndex = data.items.findIndex((item) => item.id === id);
    const newItems = [...items];
    newItems.splice(itemIndex, 1);
    setItems(newItems);

    const newExperience = updateWorkExperience(experience, "items", newItems);

    setState(newExperience);
  }

  function updateWorkExperience(
    source: WorkExperience,
    key: keyof WorkCategory,
    newValue: any
  ) {
    const experienceIndex = source.categories.findIndex(
      (category) => category.id === data.id
    );

    const newExperience = { ...experience };
    newExperience.categories[experienceIndex][key] = newValue;

    return newExperience;
  }

  return (
    <FormSection
      sectionName="Category"
      deleteHandler={handleDeleteWorkCategory}
    >
      <FormInput
        name="categoryName"
        value={categoryName}
        handler={handleCategoryName}
      ></FormInput>
      <ul className={classes.categoryList}>
        {data.items.map((item, index) => {
          return (
            <li key={item.id} className={classes.listItem}>
              <FormInput
                type="textArea"
                name={`List item ${index + 1}`}
                value={item.label}
                handler={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleWorkItem(event, item.id)
                }
              ></FormInput>
              <FormButton
                type="delete"
                handler={(event: React.MouseEvent) =>
                  handleDeleteWorkItem(event, item.id)
                }
              ></FormButton>
            </li>
          );
        })}
      </ul>
      <FormButton
        type="add"
        text="Add work item"
        handler={handleAddWorkItem}
      ></FormButton>
    </FormSection>
  );
}
