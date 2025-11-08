import type { Status } from "@/helpers/interfaces";
import Button from "@/components/Button";

import classes from "./EndGame.module.css";

export default function EndGame({
  score,
  maxScore,
  status,
  handleRestart,
}: {
  score: number;
  maxScore: number;
  status: Status;
  handleRestart: React.EventHandler<any>;
}) {
  return (
    <div className={classes.bannerWrapper}>
      <section className={classes.banner}>
        {status === "won" && <h2 className={classes.won}>You won</h2>}
        {status === "lost" && <h2 className={classes.lost}>You lost</h2>}
        <p>
          Your score: <span className={classes.score}>{score}</span>
        </p>
        <p className={classes.maxScore}>
          Max score: <span className={classes.score}>{maxScore}</span>
        </p>
        <Button onClick={handleRestart}>Play again</Button>
      </section>
    </div>
  );
}
