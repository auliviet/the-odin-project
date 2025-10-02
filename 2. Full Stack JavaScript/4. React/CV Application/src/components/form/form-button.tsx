import type { MouseEventHandler } from "react";
import classes from "./form-button.module.css";

interface FormButtonProps {
  type: "add" | "delete" | "expend" | "minimise";
  text?: string;
  handler: MouseEventHandler;
}
export default function FormButton({ type, text, handler }: FormButtonProps) {
  if (text) {
    return (
      <button className={classes.textButton} onClick={handler}>
        <div className={classes.iconWrapper}>
          <img src={`/assets/${type}.svg`} alt={type} />
        </div>
        {text}
      </button>
    );
  } else {
    return (
      <button className={classes.iconButton} onClick={handler}>
        <img src={`/assets/${type}.svg`} alt={type} />
      </button>
    );
  }
}
