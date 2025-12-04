import classes from "./Button.module.css";

export default function Button({
  onClick,
  children,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  return (
    <button className={classes.button} onClick={onClick}>
      {children}
    </button>
  );
}
