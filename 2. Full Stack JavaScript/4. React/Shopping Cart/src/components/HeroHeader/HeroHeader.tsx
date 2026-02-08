import classes from "./HeroHeader.module.css";

export default function HeroHeader() {
  return (
    <header className={classes.heroHeader}>
      <h1 className={classes.firstHalf}>
        Shop
        <br />
        till
      </h1>
      <h1 className={classes.secondHalf}>
        You
        <br />
        drop
      </h1>
    </header>
  );
}
