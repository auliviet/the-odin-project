export interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  phone: string;
  address: string;
  email: string;
}

export interface Introduction {
  introduction: string;
}

interface Experience {
  id: string;
  location: string;
  startDate: string;
  endDate: string;
  introduction: string;
}

export interface WorkExperience extends Experience {
  jobTitle: string;
  company: string;
  categories: WorkCategory[];
}

export interface WorkCategory {
  id: string;
  categoryName: string;
  items: WorkItem[];
}

export interface WorkItem {
  id: string;
  label: string;
}

export interface EducationExperience extends Experience {
  degree: string;
  school: string;
}

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
