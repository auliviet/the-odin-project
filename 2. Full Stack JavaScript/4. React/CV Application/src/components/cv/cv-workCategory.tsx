import type { WorkCategory } from "../../utils/types";
import classes from "./cv-workCategory.module.css";

export default function WorkCategory({ data }: { data: WorkCategory }) {
  return (
    <li className={classes.category}>
      <h6>{data.categoryName}</h6>
      <ul className={classes.items}>
        {data.items.map((item) => (
          <li key={item.id} className={classes.item}>
            {item.label}
          </li>
        ))}
      </ul>
    </li>
  );
}
