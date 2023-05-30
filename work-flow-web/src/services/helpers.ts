import { RequiredError, ValidationError } from "../interfaces/error";

export function isValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as any).status === "number" &&
    "data" in error &&
    typeof (error as any).data === "object" &&
    "message" in (error as any).data &&
    typeof (error as any).data.message === "string"
  );
}

export function isRequiredError(error: unknown): error is RequiredError {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as any).data === "object" &&
    "status" in error &&
    typeof (error as any).status === "number" &&
    "errors" in (error as any).data &&
    typeof (error as any).data.errors === "object" &&
    "title" in (error as any).data &&
    typeof (error as any).data.title === "string"
  );
}
