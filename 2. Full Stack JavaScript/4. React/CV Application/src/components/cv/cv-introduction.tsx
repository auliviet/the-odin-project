import type { Introduction } from "../../utils/types";

export default function CVIntroduction({ data }: { data: Introduction }) {
  return <p className="cv-introduction__intro">{data.introduction}</p>;
}
