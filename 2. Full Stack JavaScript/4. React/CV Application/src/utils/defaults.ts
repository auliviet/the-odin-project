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
    "Stoic philosopher-king who ruled the Roman Empire with wisdom, discipline, and a relentless commitment to duty. Adept at leading vast armies, managing complex provincial administrations, and authoring timeless meditations on virtue and leadership.",
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
      "Guided the empire through wars, plague, and political intrigue while embodying Stoic principles. Championed legal reforms, infrastructure projects, and cultural patronage.",
    categories: [
      {
        id: crypto.randomUUID(),
        categoryName: "Military Campaigns",
        items: [
          {
            id: crypto.randomUUID(),
            label: "Marcomannic Wars - Secured the Danube frontier.",
          },
          {
            id: crypto.randomUUID(),
            label: "Parthian Expedition - Stabilised eastern borders.",
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        categoryName: "Administrative Reforms",
        items: [
          {
            id: crypto.randomUUID(),
            label: "Codified imperial edicts into a unified legal corpus.",
          },
          {
            id: crypto.randomUUID(),
            label: "Reorganized provincial tax collection to curb corruption.",
          },
        ],
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    jobTitle: "Praetorian Prefect",
    location: "Rome",
    company: "Roman empire",
    startDate: "March 151",
    endDate: "February 161",
    introduction:
      "Served as senior aide to Emperor Antoninus Pius, overseeing the Praetorian Guard and acting as chief liaison between the Senate and the imperial court.",
    categories: [
      {
        id: crypto.randomUUID(),
        categoryName: "Leadership",
        items: [
          {
            id: crypto.randomUUID(),
            label: "Managed a force of ~10,000 elite soldiers.",
          },
          {
            id: crypto.randomUUID(),
            label:
              "Implemented rigorous training regimens based on Stoic discipline.",
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        categoryName: "Crisis Management",
        items: [
          {
            id: crypto.randomUUID(),
            label: "Coordinated relief during the Antonine Plague (165 CE).",
          },
          {
            id: crypto.randomUUID(),
            label: "Negotiated peace treaties with Germanic tribes.",
          },
        ],
      },
    ],
  },
];

export const defaultEducationExperiences: EducationExperience[] = [
  {
    id: crypto.randomUUID(),
    degree: "Classical Rhetoric",
    location: "Rome",
    school: "Ludus Magnus",
    startDate: "March 121",
    endDate: "December 124",
    introduction:
      "Studied under the eminent rhetorician Fronto and the Stoic philosopher Junius Rusticus. Developed mastery of Latin oratory, Greek philosophy, and ethical reasoning.",
  },
];
