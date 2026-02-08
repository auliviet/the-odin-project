import classes from "./Heading.module.css";

export default function Heading({
  title,
  level,
  children,
}: {
  title: string;
  level: number;
  children?: string;
}) {
  return (
    <div className={classes.heading}>
      {level === 1 && <h1>{title}</h1>}
      {level !== 1 && <h2>{title}</h2>}
      {children && <p>{children}</p>}
    </div>
  );
}
