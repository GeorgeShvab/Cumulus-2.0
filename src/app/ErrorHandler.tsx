"use client";

import Alert from "@/components/Alert/Alert";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";

type ErrorType = "invalid_coordinates" | "city_not_found" | undefined;

const ErrorHandler: FC = () => {
  const [error, setError] = useState<ErrorType>();
  const params = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const paramsError = params.get("error") as ErrorType;

    if (paramsError) {
      setError(paramsError);

      timeoutRef.current = setTimeout(() => setError(undefined), 7500);
    } else {
      setError(undefined);
    }

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [params]);

  const renderErrorMessage = () => {
    switch (error) {
      case "city_not_found":
        return <Alert>Населений пункт не знайдено</Alert>;
      case "invalid_coordinates":
        return <Alert>Координати невірні</Alert>;
      default:
        return null;
    }
  };

  return renderErrorMessage();
};

export default ErrorHandler;
