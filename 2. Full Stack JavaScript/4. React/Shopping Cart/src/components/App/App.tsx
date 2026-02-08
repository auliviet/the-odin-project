import classes from "./App.module.css";

export default function App({ title }: { title: string }) {
  return <h1 className={classes.app}>{title ? title : "My App"}</h1>;
}
