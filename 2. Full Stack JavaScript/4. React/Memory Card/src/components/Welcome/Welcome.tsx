import type { Status } from "@/helpers/interfaces";
import Button from "@/components/Button";

export default function Welcome({
  setGameStatus,
}: {
  setGameStatus: React.Dispatch<React.SetStateAction<Status>>;
}) {
  return (
    <header>
      <h1>The Citadel</h1>
      <p className="intro">Select each Rick once.</p>
      <p className="intro">Not twice.</p>
      <Button onClick={() => setGameStatus("playing")}>Play</Button>
    </header>
  );
}
