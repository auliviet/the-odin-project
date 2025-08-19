import type { MouseEventHandler } from "react";

interface FormButtonProps {
  type: "add" | "delete" | "expend" | "minimise";
  text?: string;
  handler: MouseEventHandler;
}
export default function FormButton({ type, text, handler }: FormButtonProps) {
  return (
    <button onClick={handler}>
      <div>
        <img src={`/assets/${type}.svg`} alt={type} />
      </div>
      {text && text}
    </button>
  );
}
