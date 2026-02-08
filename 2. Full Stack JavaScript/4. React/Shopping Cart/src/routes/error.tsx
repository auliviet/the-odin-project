import ErrorMessage from "@/components/Error";
import { useRouteError, type ErrorResponse } from "react-router";

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  console.error(error);

  return (
    <>
      <ErrorMessage error={error} />
    </>
  );
}
