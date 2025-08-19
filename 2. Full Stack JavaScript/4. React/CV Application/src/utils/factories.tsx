import type {
  EducationExperience,
  Setter,
  WorkCategory,
  WorkExperience,
  WorkItem,
} from "./types";

export function handlerFactory<T>(dataSlice: T, setter: Setter<T>) {
  return function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const label = event.target.name;
    const newValue = {
      ...dataSlice,
      [label]: event.target.value,
    };

    setter(newValue);
    return newValue;
  };
}

export function WorkExperienceFactory(): WorkExperience {
  return {
    id: crypto.randomUUID(),
    jobTitle: "",
    location: "",
    company: "",
    startDate: "",
    endDate: "",
    introduction: "",
    categories: [],
  };
}

export function EducationExperienceFactory(): EducationExperience {
  return {
    id: crypto.randomUUID(),
    degree: "",
    location: "",
    school: "",
    startDate: "",
    endDate: "",
    introduction: "",
  };
}

export function WorkCategoryFactory(): WorkCategory {
  return {
    id: crypto.randomUUID(),
    categoryName: "",
    items: [],
  };
}

export function WorkItemFactory(): WorkItem {
  return {
    id: crypto.randomUUID(),
    label: "",
  };
}
