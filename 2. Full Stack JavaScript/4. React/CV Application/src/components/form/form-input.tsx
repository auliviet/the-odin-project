import formatLabel from "../../utils/formatLabel";

type InputType = "text" | "textArea" | "phone" | "email" | "date";

interface InputProps {
  type?: InputType;
  name: string;
  value: string;
  handler: Function;
}
export default function ({ type = "text", name, value, handler }: InputProps) {
  /*
  Update states onChange by using the handler function passed to the compon ent
  */
  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    handler(event);
  }

  return (
    <label>
      {formatLabel(name)}:
      {type === "textArea" ? (
        <textarea value={value} name={name} onChange={onChange}></textarea>
      ) : (
        <input
          type={type}
          value={value}
          name={name}
          onChange={onChange}
        ></input>
      )}
    </label>
  );
}
