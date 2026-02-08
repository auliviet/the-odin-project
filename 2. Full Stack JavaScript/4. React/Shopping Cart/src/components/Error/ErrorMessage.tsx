import { isRouteErrorResponse, type ErrorResponse } from "react-router";
import classes from "./ErrorMessage.module.css";

export default function ErrorMessage({
  error,
}: {
  error: ErrorResponse | Error;
}) {
  if (isRouteErrorResponse(error)) {
    return (
      <section className={classes.error}>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </section>
    );
  } else if (error instanceof Error) {
    return (
      <section className={classes.error}>
        <h1>Error</h1>
        <p>{error.message}</p>
      </section>
    );
  } else {
    return (
      <section className={classes.error}>
        <h1>Unknown Error</h1>
      </section>
    );
  }
}
