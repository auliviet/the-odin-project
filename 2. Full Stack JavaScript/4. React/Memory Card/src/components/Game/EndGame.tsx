import type { Status } from "@/helpers/interfaces";
import Button from "@/components/Button";

export default function EndGame({
  score,
  maxScore,
  gameStatus,
  handleRestart,
}: {
  score: number;
  maxScore: number;
  gameStatus: Status;
  handleRestart: React.EventHandler<any>;
}) {
  return (
    <section>
      {gameStatus === "won" && <p className="won">You won</p>}
      {gameStatus === "lost" && <p className="lost">You lost</p>}
      <p>
        Your score: <span className="score">{score}</span>
      </p>
      <p>
        Max score: <span className="score">{maxScore}</span>
      </p>

      <Button onClick={handleRestart}>Play again</Button>
    </section>
  );
}
