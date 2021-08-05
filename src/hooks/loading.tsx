import { useState } from "react";

export function useLoading() {
  const [isLoading, setIsLoading] = useState(true);

  function handleStopLoading() {
    setIsLoading(false);
  }

  return { isLoading, handleStopLoading };
}
