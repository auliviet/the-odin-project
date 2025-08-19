import type {
  PersonalInfo,
  Introduction,
  WorkExperience,
  EducationExperience,
} from "./types";

export const defaultPersonalInfo: PersonalInfo = {
  firstName: "Marcus",
  lastName: "Aurelius",
  jobTitle: "Imperator",
  phone: "0123 456 789",
  address: "Rome, Italia, Roman Empire",
  email: "maurelius@imperator.it",
};

export const defaultIntroduction: Introduction = {
  introduction:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie eleifend quam ac tristique. Nam sit amet vehicula libero. Suspendisse sed viverra nisl. Nulla pellentesque purus a sagittis consequat. Duis erat lectus, venenatis in blandit interdum, venenatis non tellus. Mauris sit amet leo convallis, sagittis sapien ac, rhoncus enim. Donec vulputate neque ante, in fermentum turpis tristique vel. Vestibulum sagittis ligula non ex mollis, eu rhoncus urna convallis. Nulla dapibus at ipsum vitae venenatis.",
};

export const defaultWorkExperiences: WorkExperience[] = [
  {
    id: crypto.randomUUID(),
    jobTitle: "Imperator",
    location: "Rome",
    company: "Roman empire",
    startDate: "March 161",
    endDate: "March 180",
    introduction:
      "Because a thing seems difficult for you, do not think it impossible for anyone to accomplish.",
    categories: [
      {
        id: crypto.randomUUID(),
        categoryName: "Conquests",
        items: [
          {
            id: crypto.randomUUID(),
            label: "North bank of the Euphrates.",
          },
          {
            id: crypto.randomUUID(),
            label: "Anthemusia, a town southwest of Edessa.",
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        categoryName: "Philosophy",
        items: [
          {
            id: crypto.randomUUID(),
            label: "Meditations",
          },
          {
            id: crypto.randomUUID(),
            label: "To Himself.",
          },
        ],
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    jobTitle: "Imperator",
    location: "Rome",
    company: "Roman empire",
    startDate: "March 181",
    endDate: "March 190",
    introduction:
      "Because a thing seems difficult for you, do not think it impossible for anyone to accomplish.",
    categories: [
      {
        id: crypto.randomUUID(),
        categoryName: "Conquests",
        items: [
          {
            id: crypto.randomUUID(),
            label: "North bank of the Euphrates.",
          },
          {
            id: crypto.randomUUID(),
            label: "Anthemusia, a town southwest of Edessa.",
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        categoryName: "Philosophy",
        items: [
          {
            id: crypto.randomUUID(),
            label: "Meditations",
          },
          {
            id: crypto.randomUUID(),
            label: "To Himself.",
          },
        ],
      },
    ],
  },
];

export const defaultEducationExperiences: EducationExperience[] = [
  {
    id: crypto.randomUUID(),
    degree: "Basic rhetoric",
    location: "Rome",
    school: "Agora",
    startDate: "March 161",
    endDate: "Dcember 161",
    introduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie eleifend quam ac tristique. Nam sit amet vehicula libero. Suspendisse sed viverra nisl.",
  },
];
