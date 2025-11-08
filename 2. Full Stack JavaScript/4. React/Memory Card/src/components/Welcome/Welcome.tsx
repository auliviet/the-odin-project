import type { Status } from "@/helpers/interfaces";
import Button from "@/components/Button";

import classes from "./Welcome.module.css";
import playSound from "@/helpers/playSound";

export default function Welcome({
  setStatus,
}: {
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
}) {
  return (
    <div className={classes.welcomeWrapper}>
      <header className={classes.welcomeHeader}>
        <h1>The Citadel</h1>
        <p className={classes.intro}>
          Select each Rick once.
          <br />
          Not twice.
        </p>
        <Button
          onClick={() => {
            setStatus("playing");
            playSound("start");
          }}
        >
          Play
        </Button>
      </header>
    </div>
  );
}
