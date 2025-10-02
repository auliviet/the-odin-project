import type { Introduction } from "../../utils/types";
import classes from "./cv-introduction.module.css";

export default function CVIntroduction({ data }: { data: Introduction }) {
  return <p className={classes.introduction}>{data.introduction}</p>;
}
