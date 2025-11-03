export interface Character {
  id: number;
  name: string;
  image: string;
  position: number;
}

export type Status = "start" | "playing" | "won" | "lost";
