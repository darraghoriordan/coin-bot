import React, { FunctionComponent, ReactNode } from "react";
import { QuestionResultIcon } from "./QuestionResultIcon";

type ResultProps = {
  result: boolean;
};
export const RunningState: FunctionComponent<ResultProps> = ({
  result,
}) => {
  const message = result ? "Running" : "Stopped";

  return (
    <span className="flex">
      <QuestionResultIcon result={result} />
      {message}
    </span>
  );
};
